# Real-time Server for Collaborative Code Editor

This is the Node.js + Socket.io backend server that handles real-time communication for the collaborative code editor.

## Features

- **Real-time synchronization** using Socket.io
- **Document room management** for isolated collaboration sessions
- **Automatic document saving** with debounced writes to MongoDB
- **Participant tracking** and presence awareness
- **Graceful error handling** and connection management
- **Health monitoring** endpoint
- **Memory-efficient session management**

## Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for REST endpoints
- **Socket.io** - Real-time bidirectional communication
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Ensure the `.env` file contains:

```env
MONGODB_URI=mongodb://localhost:27017/collaborative-editor
PORT=5001
CORS_ORIGIN=http://localhost:3000
```

### 3. Start MongoDB

Make sure MongoDB is running on the configured URI (default: `mongodb://localhost:27017/collaborative-editor`)

### 4. Run the Server

**Development mode (with auto-restart):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on port 5001 (or the PORT specified in .env).

## API Endpoints

### REST Endpoints

- `GET /` - Server information and status
- `GET /health` - Health check with active sessions info

### Socket.io Events

#### Client to Server

- `join-document` - Join a document collaboration room

  ```javascript
  socket.emit("join-document", documentId);
  ```

- `send-changes` - Send content changes to other participants

  ```javascript
  socket.emit("send-changes", { content, documentId });
  ```

- `cursor-position` - Send cursor position (for future features)
  ```javascript
  socket.emit("cursor-position", { documentId, position, selection });
  ```

#### Server to Client

- `receive-changes` - Receive content changes from other participants

  ```javascript
  socket.on("receive-changes", ({ content, documentId, senderId }) => {
    // Update editor content
  });
  ```

- `user-joined` - Notification when a user joins the document

  ```javascript
  socket.on("user-joined", ({ socketId, participantCount }) => {
    // Update UI to show new participant
  });
  ```

- `user-left` - Notification when a user leaves the document

  ```javascript
  socket.on("user-left", ({ socketId, participantCount }) => {
    // Update UI to remove participant
  });
  ```

- `cursor-update` - Receive cursor position updates (for future features)
  ```javascript
  socket.on("cursor-update", ({ socketId, position, selection }) => {
    // Show other users' cursors
  });
  ```

## Architecture

### Session Management

The server maintains active sessions in memory:

```javascript
activeSessions = {
  documentId: {
    content: "current document content",
    lastSaved: timestamp,
    participants: Set(["socketId1", "socketId2"]),
  },
};
```

### Document Persistence

- **Debounced saves**: Changes are saved to MongoDB after 2 seconds of inactivity
- **Final save on disconnect**: When the last participant leaves, the document is saved immediately
- **Graceful shutdown**: All active documents are saved before server shutdown

### Room Management

- Each document has its own Socket.io room
- Clients automatically join/leave rooms when switching documents
- Changes are broadcasted only to participants in the same room

## Performance Considerations

- **Memory management**: Empty sessions are cleaned up automatically
- **Database optimization**: Debounced saves prevent excessive MongoDB writes
- **Scalability**: Uses Socket.io rooms for efficient message broadcasting

## Monitoring

### Health Check

```bash
curl http://localhost:5001/health
```

Response:

```json
{
  "status": "healthy",
  "timestamp": "2025-08-03T...",
  "activeDocuments": 2,
  "totalParticipants": 5,
  "mongoConnection": "connected"
}
```

### Logs

The server provides detailed logging for:

- Client connections/disconnections
- Document joins/leaves
- Content changes and saves
- Error conditions

## Development

### File Structure

```
realtime-server/
├── server.js          # Main server implementation
├── package.json       # Dependencies and scripts
├── .env              # Environment variables
├── README.md         # This file
└── node_modules/     # Installed packages
```

### Adding Features

Common extensions:

1. **User authentication** - Integrate with JWT tokens
2. **Cursor tracking** - Show real-time cursor positions
3. **Version history** - Store document versions
4. **Access control** - Implement document permissions
5. **Rate limiting** - Prevent abuse
6. **Clustering** - Scale across multiple processes

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure CORS_ORIGIN matches the client URL
2. **MongoDB connection**: Verify MongoDB is running and accessible
3. **Port conflicts**: Check if port 5001 is available
4. **Socket.io connection**: Verify client and server versions are compatible

### Debugging

Enable debug mode:

```bash
DEBUG=socket.io:* npm run dev
```

This will show detailed Socket.io connection logs.
