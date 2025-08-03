# Real-Time Collaborative Code Editor

A Next.js 14 application with TypeScript and Tailwind CSS that serves as the client for a real-time collaborative code editor with AI assistant features.

## Features

- **Real-time collaboration** via Socket.io
- **AI-powered code assistance** with explanation and bug fixing features
- **MongoDB integration** for document persistence
- **Modern UI** with Tailwind CSS
- **TypeScript** for type safety

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── documents/
│   │       ├── route.ts          # GET/POST documents
│   │       └── [id]/
│   │           └── route.ts      # GET/PUT specific document
│   ├── layout.tsx
│   └── page.tsx                  # Main page with editor
├── components/
│   └── CollaborativeEditor.tsx   # Main editor component
├── lib/
│   └── mongodb.ts               # MongoDB connection utility
├── models/
│   └── Document.ts              # Document schema/model
└── types/
    └── global.d.ts              # Global type declarations
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd editor-app
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/collaborative-editor

# OpenAI API Key (for future LLM integration)
OPENAI_API_KEY=your_openai_api_key_here

# Next.js Environment
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 3. MongoDB Setup

Make sure you have MongoDB running locally on port 27017, or update the `MONGODB_URI` to point to your MongoDB instance.

### 4. Real-time Server

The editor expects a Socket.io server running on `http://localhost:5001`. You'll need to set up the real-time server separately to handle:

- `join-document` events
- `send-changes` events
- `receive-changes` events

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Documents

- `GET /api/documents` - List all documents
- `POST /api/documents` - Create a new document
- `GET /api/documents/[id]` - Get a specific document
- `PUT /api/documents/[id]` - Update a specific document

## Component Features

### CollaborativeEditor

The main editor component includes:

- **Real-time synchronization** with Socket.io
- **Text selection tracking** for AI features
- **AI Assistant buttons** (Explain Code, Fix Code)
- **Connection status indicator**
- **Responsive design** with side panel for AI responses

### AI Integration (Placeholder)

Currently implemented as placeholder functions that can be extended with actual LLM API calls:

- `handleExplainCode()` - Explains selected code
- `handleFixCode()` - Suggests fixes for selected code

## Technical Implementation

### MongoDB Connection

Uses a singleton pattern to maintain a single database connection across API routes, with proper error handling and connection caching.

### Document Model

Mongoose schema with:

- `title` (required string, max 200 characters)
- `content` (string, default empty)
- Automatic timestamps (`createdAt`, `updatedAt`)

### Real-time Communication

Socket.io client integration with:

- Automatic reconnection
- Document room management
- Change synchronization
- Connection status tracking

### Type Safety

Full TypeScript implementation with:

- Interface definitions for props and data structures
- Proper typing for Socket.io events
- Type-safe API responses

## Next Steps

1. **Set up the real-time server** (Node.js + Socket.io)
2. **Implement actual LLM integration** (OpenAI API)
3. **Add user authentication** (NextAuth.js)
4. **Implement code syntax highlighting** (Monaco Editor or CodeMirror)
5. **Add collaborative cursors** and user presence
6. **Implement document persistence** in real-time

## Dependencies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Mongoose (MongoDB ODM)
- Socket.io Client
- Additional dev dependencies for linting and formatting
