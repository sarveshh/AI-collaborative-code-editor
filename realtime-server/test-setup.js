// Simple test script to validate server setup
const mongoose = require("mongoose");
require("dotenv").config();

console.log("🧪 Testing server setup...");

// Test MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/collaborative-editor";

console.log(`📡 Attempting to connect to MongoDB: ${MONGODB_URI}`);

mongoose
  .connect(MONGODB_URI, {
    bufferCommands: false,
  })
  .then(() => {
    console.log("✅ MongoDB connection successful");

    // Test Document model
    const DocumentSchema = new mongoose.Schema(
      {
        title: { type: String, required: true },
        content: { type: String, default: "" },
      },
      { timestamps: true }
    );

    const Document = mongoose.model("TestDocument", DocumentSchema);

    console.log("✅ Document model created successfully");

    // Close connection
    mongoose.connection.close();
    console.log("🏁 Test completed successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  });
