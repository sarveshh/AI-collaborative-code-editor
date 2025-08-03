const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Configure CORS for Express
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Configure Socket.io with CORS
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Express middleware
app.use(express.json());

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/collaborative-editor";

mongoose
  .connect(MONGODB_URI, {
    bufferCommands: false,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Document Model (matching the Next.js app schema)
const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Document title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", DocumentSchema);

// Store active document sessions
const activeSessions = new Map(); // documentId -> { content, lastSaved, participants }

// Store document save timers
const saveTimers = new Map(); // documentId -> timer

// Debounced save function
const debouncedSave = (documentId, content) => {
  // Clear existing timer if any
  if (saveTimers.has(documentId)) {
    clearTimeout(saveTimers.get(documentId));
  }

  // Set new timer for 2 seconds
  const timer = setTimeout(async () => {
    try {
      await Document.findByIdAndUpdate(
        documentId,
        { content },
        { new: true, runValidators: true }
      );
      console.log(`📝 Document ${documentId} saved to database`);

      // Update last saved timestamp
      if (activeSessions.has(documentId)) {
        activeSessions.get(documentId).lastSaved = Date.now();
      }
    } catch (error) {
      console.error(`❌ Error saving document ${documentId}:`, error);
    } finally {
      saveTimers.delete(documentId);
    }
  }, 2000); // Save after 2 seconds of inactivity

  saveTimers.set(documentId, timer);
};

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  // Handle joining a document room
  socket.on("join-document", async (documentId) => {
    try {
      console.log(`📄 Client ${socket.id} joining document: ${documentId}`);

      // Leave any previous rooms
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          socket.leave(room);
        }
      });

      // Join the new document room
      socket.join(documentId);
      socket.documentId = documentId;

      // Initialize or update active session
      if (!activeSessions.has(documentId)) {
        // Try to load document from database
        const document = await Document.findById(documentId);
        if (document) {
          activeSessions.set(documentId, {
            content: document.content,
            lastSaved: Date.now(),
            participants: new Set(),
          });
        } else {
          // Create new session with empty content
          activeSessions.set(documentId, {
            content: "",
            lastSaved: Date.now(),
            participants: new Set(),
          });
        }
      }

      // Add participant to session
      const session = activeSessions.get(documentId);
      session.participants.add(socket.id);

      // Send current document content to the joining client
      socket.emit("receive-changes", {
        content: session.content,
        documentId: documentId,
      });

      // Notify other clients in the room about new participant
      socket.to(documentId).emit("user-joined", {
        socketId: socket.id,
        participantCount: session.participants.size,
      });

      console.log(
        `👥 Document ${documentId} now has ${session.participants.size} participants`
      );
    } catch (error) {
      console.error(`❌ Error joining document ${documentId}:`, error);
      socket.emit("error", { message: "Failed to join document" });
    }
  });

  // Handle content changes
  socket.on("send-changes", (data) => {
    const { content, documentId } = data;

    if (!documentId || !socket.rooms.has(documentId)) {
      console.log(`⚠️ Client ${socket.id} not in document room ${documentId}`);
      return;
    }

    try {
      // Update active session
      if (activeSessions.has(documentId)) {
        activeSessions.get(documentId).content = content;
      }

      // Broadcast changes to other clients in the same room (excluding sender)
      socket.to(documentId).emit("receive-changes", {
        content: content,
        documentId: documentId,
        senderId: socket.id,
      });

      // Debounced save to database
      debouncedSave(documentId, content);

      console.log(
        `🔄 Changes broadcasted for document ${documentId} (${content.length} chars)`
      );
    } catch (error) {
      console.error(
        `❌ Error handling changes for document ${documentId}:`,
        error
      );
    }
  });

  // Handle user cursor position (for future implementation)
  socket.on("cursor-position", (data) => {
    const { documentId, position, selection } = data;

    if (documentId && socket.rooms.has(documentId)) {
      socket.to(documentId).emit("cursor-update", {
        socketId: socket.id,
        position,
        selection,
      });
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);

    // Remove from active sessions
    if (socket.documentId && activeSessions.has(socket.documentId)) {
      const session = activeSessions.get(socket.documentId);
      session.participants.delete(socket.id);

      // Notify other clients about participant leaving
      socket.to(socket.documentId).emit("user-left", {
        socketId: socket.id,
        participantCount: session.participants.size,
      });

      // Clean up empty sessions
      if (session.participants.size === 0) {
        console.log(
          `🧹 Cleaning up empty session for document ${socket.documentId}`
        );

        // Cancel any pending save
        if (saveTimers.has(socket.documentId)) {
          clearTimeout(saveTimers.get(socket.documentId));
          saveTimers.delete(socket.documentId);
        }

        // Final save before cleanup
        if (session.content) {
          Document.findByIdAndUpdate(
            socket.documentId,
            { content: session.content },
            { new: true, runValidators: true }
          ).catch((error) => {
            console.error(
              `❌ Final save error for document ${socket.documentId}:`,
              error
            );
          });
        }

        activeSessions.delete(socket.documentId);
      }

      console.log(
        `👥 Document ${socket.documentId} now has ${session.participants.size} participants`
      );
    }
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error(`❌ Socket error for client ${socket.id}:`, error);
  });
});

// Basic health check endpoint
app.get("/health", (req, res) => {
  const activeDocuments = activeSessions.size;
  const totalParticipants = Array.from(activeSessions.values()).reduce(
    (total, session) => total + session.participants.size,
    0
  );

  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    activeDocuments,
    totalParticipants,
    mongoConnection:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Basic endpoint to get server info
app.get("/", (req, res) => {
  res.json({
    message: "Collaborative Code Editor Real-time Server",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully...");

  // Save all active documents
  const savePromises = Array.from(activeSessions.entries())
    .map(([documentId, session]) => {
      if (session.content) {
        return Document.findByIdAndUpdate(
          documentId,
          { content: session.content },
          { new: true, runValidators: true }
        );
      }
    })
    .filter(Boolean);

  Promise.all(savePromises)
    .then(() => {
      console.log("💾 All documents saved");
      server.close(() => {
        mongoose.connection.close(() => {
          console.log("👋 Server shut down complete");
          process.exit(0);
        });
      });
    })
    .catch((error) => {
      console.error("❌ Error during shutdown:", error);
      process.exit(1);
    });
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Real-time server running on port ${PORT}`);
  console.log(`🌐 Accepting connections from http://localhost:3000`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});
