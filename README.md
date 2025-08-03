# Real-Time Collaborative Rich Text Editor

A feature-rich, real-time collaborative editor with AI integration built using the MERN stack. This project demonstrates advanced real-time communication, rich text editing capabilities, and AI-powered assistance for content creation and editing.

## 🚀 Key Features

### ✨ Rich Text Editing

- **Tiptap Editor Integration** - Modern, extensible rich text editor
- **Comprehensive Formatting** - Bold, italic, strikethrough, inline code
- **Headings & Structure** - H1, H2, H3 support for document organization
- **Lists & Organization** - Bullet points and numbered lists
- **Code Blocks** - Syntax-highlighted code blocks with multiple language support
- **Blockquotes** - Rich quote formatting
- **Typography Enhancement** - Smart quotes, em dashes, and other typographic improvements
- **Undo/Redo** - Full editing history with keyboard shortcuts
- **Character/Word Count** - Real-time document statistics

### 🤝 Real-Time Collaboration

- **Live Document Sharing** - Multiple users can edit simultaneously
- **Join by Document ID** - Easy session joining with shareable document IDs
- **Real-time Synchronization** - Instant content updates across all connected users
- **Connection Status** - Visual indicators for connectivity status
- **Document Dashboard** - Manage and organize collaborative documents
- **Session Management** - Automatic cleanup and memory optimization

### 🤖 AI-Powered Assistance

- **Code Explanation** - AI-powered code analysis and explanation (framework ready)
- **Code Fixing** - Intelligent bug detection and suggestion system (framework ready)
- **Content Analysis** - Smart text processing and enhancement capabilities
- **Extensible AI Framework** - Ready for OpenAI API integration

### 📱 User Experience

- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Intuitive Interface** - Clean, modern UI with Tailwind CSS
- **Document Management** - Create, join, and manage collaborative documents
- **Share Links** - Easy document sharing with copy-to-clipboard functionality
- **Loading States** - Smooth user experience with proper loading indicators

## Project Structure

```
CollaborativeEditor/
├── editor-app/              # Next.js 14 client application
│   ├── src/
│   │   ├── app/             # App router pages and API routes
│   │   ├── components/      # React components
│   │   ├── lib/             # Utilities and configurations
│   │   ├── models/          # Database models
│   │   └── types/           # TypeScript type definitions
│   ├── package.json
│   ├── README.md           # Detailed client setup instructions
│   └── .env.local          # Environment variables
└── realtime-server/        # Node.js + Socket.io backend (to be implemented)
    ├── package.json
    └── ...                 # Server implementation files
```

## 🏗️ Technology Stack

### Frontend (editor-app)

- **Next.js 14** - React framework with App Router and TypeScript
- **Tiptap** - Modern rich text editor with extensive formatting capabilities
- **Socket.io Client** - Real-time bidirectional communication
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Mongoose** - MongoDB object modeling for document persistence
- **Highlight.js** - Syntax highlighting for code blocks
- **Lowlight** - Code highlighting integration for Tiptap

### Backend (realtime-server)

- **Node.js** - JavaScript runtime environment
- **Express.js** - Minimal web framework for APIs
- **Socket.io** - Real-time communication engine
- **MongoDB** - NoSQL document database
- **Mongoose** - Object Document Mapping (ODM)
- **CORS** - Cross-origin resource sharing configuration

### AI/LLM Integration (Framework Ready)

- **OpenAI API Integration** - Ready for GPT integration
- **Content Processing** - HTML-to-text conversion for AI analysis
- **Extensible Architecture** - Plugin-ready AI assistance system

## ✅ Implementation Status

### 🎯 Completed Features

#### Rich Text Editor

- [x] **Tiptap Integration** - Modern WYSIWYG editor with extensible architecture
- [x] **Formatting Tools** - Bold, italic, strikethrough, inline code formatting
- [x] **Document Structure** - H1, H2, H3 headings for content organization
- [x] **Lists & Organization** - Bullet points and numbered lists
- [x] **Code Blocks** - Syntax-highlighted code blocks with language detection
- [x] **Enhanced Typography** - Smart quotes, em dashes, and typography improvements
- [x] **Blockquotes** - Professional quote formatting
- [x] **Undo/Redo System** - Complete editing history with keyboard shortcuts
- [x] **Character/Word Count** - Real-time document statistics
- [x] **SSR Compatibility** - Proper hydration handling for Next.js

#### Collaborative Features

- [x] **Real-time Synchronization** - Live content updates across all users
- [x] **Document Dashboard** - Central hub for document management
- [x] **Join by ID System** - Easy session joining with document IDs
- [x] **Share Links** - Copy-to-clipboard document sharing
- [x] **Connection Status** - Visual connectivity indicators
- [x] **Session Management** - Automatic room management and cleanup

#### Backend Infrastructure

- [x] **Socket.io Server** - Real-time communication server with Express.js
- [x] **MongoDB Integration** - Document persistence with Mongoose
- [x] **Room Management** - Document-based room system for collaboration
- [x] **Debounced Saving** - Optimized database writes to prevent spam
- [x] **CORS Configuration** - Proper cross-origin setup for development
- [x] **Error Handling** - Graceful error management and logging

#### AI Framework

- [x] **AI Assistant UI** - Interactive panels for AI-powered features
- [x] **Content Processing** - HTML-to-text conversion for AI analysis
- [x] **Text Selection** - Smart text selection for targeted AI assistance
- [x] **Extensible Architecture** - Plugin-ready system for AI integrations
- [x] **Response Management** - AI response display and interaction system

#### API & Database

- [x] **RESTful API** - Complete CRUD operations for documents
- [x] **MongoDB Connection** - Singleton pattern with connection pooling
- [x] **Document Model** - Comprehensive schema for document management
- [x] **Environment Configuration** - Secure environment variable handling
- [x] **Error Validation** - Robust input validation and error responses

#### Development Experience

- [x] **Concurrently Setup** - Unified development server startup
- [x] **VS Code Tasks** - Integrated development workflow
- [x] **TypeScript Configuration** - Full type safety across the application
- [x] **CSS Styling** - Custom styles for rich text editor components
- [x] **Hot Reloading** - Fast development iteration with live updates

### 🔄 Ready for Enhancement

- [ ] **OpenAI API Integration** - Connect actual LLM services for AI features
- [ ] **User Authentication** - Add user accounts and permissions
- [ ] **Collaborative Cursors** - Show real-time cursor positions of other users
- [ ] **Document Versioning** - Track document history and enable rollbacks
- [ ] **Advanced Code Features** - Auto-completion, linting, and advanced syntax support
- [ ] **File Upload/Export** - Import/export documents in various formats
- [ ] **Advanced Permissions** - Document sharing with different access levels

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (running locally or connection string)
- **Git** for cloning the repository

### Option 1: One-Command Setup (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd CollaborativeEditor

# Install all dependencies
npm run install:all

# Start both server and client with concurrently
npm run dev
```

This will start:

- **Real-time Server** at [http://localhost:5001](http://localhost:5001)
- **Client Application** at [http://localhost:3000](http://localhost:3000)

### Option 2: Manual Setup

#### 1. Start the Real-time Server

```bash
cd realtime-server
npm install
npm run dev
```

#### 2. Start the Client Application

In a new terminal:

```bash
cd editor-app
npm install
npm run dev
```

### Option 3: Platform-Specific Scripts

**Windows:**

```bash
./start.bat
```

**Unix/Linux/macOS:**

```bash
chmod +x start.sh
./start.sh
```

### Option 4: VS Code Integration

1. Open VS Code in the project root
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
3. Type "Tasks: Run Task"
4. Select "Start Everything (Concurrently)"

## 🔧 Environment Setup

### Client Environment (.env.local in editor-app)

```env
MONGODB_URI=mongodb://localhost:27017/collaborative-editor
OPENAI_API_KEY=your_openai_api_key_here  # Optional, for AI features
NEXTAUTH_SECRET=your_nextauth_secret_here  # For future auth implementation
NEXTAUTH_URL=http://localhost:3000
```

### Server Environment (.env in realtime-server)

```env
MONGODB_URI=mongodb://localhost:27017/collaborative-editor
PORT=5001
NODE_ENV=development
```

## 🎮 How to Use

### Creating and Joining Documents

1. **Create New Document**

   - Visit [http://localhost:3000](http://localhost:3000)
   - Click "Create New Document"
   - Start editing with the rich text editor

2. **Join Existing Document**

   - Copy the document ID from the URL or share link
   - Paste it in the "Join Session by Document ID" field
   - Click "Join Session" to start collaborating

3. **Share Documents**
   - Click the "Copy Share Link" button in any document
   - Share the link with collaborators
   - Multiple users can edit simultaneously

### Using the Rich Text Editor

- **Basic Formatting**: Use toolbar buttons for bold, italic, strikethrough
- **Headings**: Create H1, H2, H3 for document structure
- **Lists**: Add bullet points or numbered lists
- **Code Blocks**: Insert syntax-highlighted code blocks
- **Quotes**: Add professional blockquotes
- **Undo/Redo**: Use Ctrl+Z/Ctrl+Y or toolbar buttons

### AI Assistant Features

- **Explain Content**: Select text and click "Explain Code" for AI analysis
- **Fix Content**: Select text and click "Fix Code" for AI suggestions
- **Content Processing**: AI processes both rich text and plain text content

## 📋 Available NPM Scripts

### Root Directory Commands

- `npm run dev` - Start both server and client in development mode
- `npm run start` - Start both server and client in production mode
- `npm run server` - Start only the real-time server (development)
- `npm run client` - Start only the client application (development)
- `npm run install:all` - Install dependencies for all packages
- `npm run clean` - Remove all node_modules directories

### Client Commands (editor-app)

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Server Commands (realtime-server)

- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run test` - Run server tests (if implemented)

## 🏗️ Project Architecture

```
CollaborativeEditor/
├── editor-app/                 # Next.js 14 Client Application
│   ├── src/
│   │   ├── app/               # App Router (Pages & API Routes)
│   │   │   ├── api/           # RESTful API endpoints
│   │   │   ├── editor/        # Dynamic editor pages
│   │   │   ├── globals.css    # Global styles + Tiptap CSS
│   │   │   └── layout.tsx     # Root layout component
│   │   ├── components/        # React Components
│   │   │   ├── CollaborativeEditor.tsx  # Main editor component
│   │   │   ├── RichTextEditor.tsx       # Tiptap rich text editor
│   │   │   └── DocumentDashboard.tsx    # Document management
│   │   ├── lib/               # Utilities
│   │   │   └── mongodb.ts     # Database connection
│   │   └── models/            # Database Models
│   │       └── Document.ts    # Document schema
│   ├── package.json           # Client dependencies
│   └── .env.local            # Client environment variables
│
├── realtime-server/           # Node.js + Socket.io Backend
│   ├── server.js             # Main server file with Socket.io
│   ├── package.json          # Server dependencies
│   └── .env                  # Server environment variables
│
├── package.json              # Root package for concurrently
├── start.sh / start.bat      # Platform-specific startup scripts
└── README.md                 # This documentation
```

## 🔌 API Documentation

### REST API Endpoints

#### Documents API

| Method | Endpoint              | Description           | Request Body           |
| ------ | --------------------- | --------------------- | ---------------------- |
| `GET`  | `/api/documents`      | List all documents    | -                      |
| `POST` | `/api/documents`      | Create new document   | `{ title, content }`   |
| `GET`  | `/api/documents/[id]` | Get specific document | -                      |
| `PUT`  | `/api/documents/[id]` | Update document       | `{ title?, content? }` |

#### Example API Usage

```javascript
// Create a new document
const response = await fetch("/api/documents", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "My New Document",
    content: "<p>Hello world!</p>",
  }),
});

// Get document by ID
const document = await fetch("/api/documents/60f7b3b3b3b3b3b3b3b3b3b3");
```

### Real-time Events (Socket.io)

#### Client → Server Events

| Event           | Description          | Payload                                   |
| --------------- | -------------------- | ----------------------------------------- |
| `join-document` | Join a document room | `{ documentId: string }`                  |
| `send-changes`  | Send content changes | `{ content: string, documentId: string }` |
| `disconnect`    | Leave document room  | Automatic                                 |

#### Server → Client Events

| Event             | Description             | Payload                                   |
| ----------------- | ----------------------- | ----------------------------------------- |
| `receive-changes` | Receive content updates | `{ content: string, documentId: string }` |
| `user-joined`     | User joined document    | `{ userId: string, documentId: string }`  |
| `user-left`       | User left document      | `{ userId: string, documentId: string }`  |

#### Example Socket.io Usage

```javascript
// Client-side Socket.io integration
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

// Join a document room
socket.emit("join-document", { documentId: "doc_123" });

// Send content changes
socket.emit("send-changes", {
  content: "<p>Updated content</p>",
  documentId: "doc_123",
});

// Listen for changes from other users
socket.on("receive-changes", (data) => {
  console.log("Received update:", data.content);
});
```

## 🛠️ Development Workflow

### Getting Started

1. **Clone and Setup**

   ```bash
   git clone <repository-url>
   cd CollaborativeEditor
   npm run install:all
   ```

2. **Start Development Environment**

   ```bash
   npm run dev  # Starts both client and server
   ```

3. **Open in Browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Create a new document or join an existing one

### Testing Collaboration

1. **Create Document**: Open the app and create a new document
2. **Copy Document ID**: Get the ID from the URL (e.g., `60f7b3b3b3b3b3b3b3b3b3b3`)
3. **Join from Another Tab/Device**: Use "Join Session by Document ID"
4. **Test Real-time Sync**: Type in one tab and see updates in the other

### Adding AI Features

The application is ready for OpenAI integration:

```javascript
// In CollaborativeEditor.tsx, replace simulated AI calls with:
const response = await fetch("/api/ai/explain", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    content: stripHtmlTags(selectedText || content),
    action: "explain",
  }),
});
```

## 🚀 Deployment

### Prerequisites for Production

- **Database**: MongoDB Atlas or self-hosted MongoDB
- **Environment Variables**: Update all `.env` files with production values
- **Domain**: Configure CORS settings for your production domain

### Vercel Deployment (Client)

```bash
cd editor-app
npm run build
# Deploy to Vercel or similar platform
```

### Server Deployment Options

1. **Railway/Render**: Easy deployment for Node.js apps
2. **DigitalOcean/AWS**: VPS deployment with PM2
3. **Docker**: Containerized deployment

### Environment Variables for Production

```env
# Client (.env.local)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/collaborative-editor
OPENAI_API_KEY=sk-your-openai-key
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com

# Server (.env)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/collaborative-editor
PORT=5001
NODE_ENV=production
```

## 🎯 Next Steps & Roadmap

### Immediate Enhancements

1. **OpenAI Integration**

   - Add actual API calls to OpenAI GPT models
   - Implement code explanation and bug detection
   - Add content suggestions and improvements

2. **User Authentication**

   - Implement NextAuth.js for user management
   - Add document ownership and permissions
   - Create user profiles and preferences

3. **Advanced Collaboration**
   - Add collaborative cursors showing user positions
   - Implement user presence indicators
   - Add user avatars and names in sessions

### Future Features

1. **Document Management**

   - Document versioning and history
   - Document templates and categories
   - Advanced search and filtering

2. **Editor Enhancements**

   - Table support for structured data
   - Image upload and embedding
   - Mathematical equation support
   - Export to PDF, Word, Markdown

3. **Performance & Scaling**
   - Implement operational transformation for conflict resolution
   - Add Redis for session management
   - Optimize for large documents and many users

## 🤝 Contributing

This project demonstrates modern full-stack development practices:

- **Real-time Communication**: Socket.io integration
- **Rich Text Editing**: Tiptap editor with extensive formatting
- **Database Integration**: MongoDB with Mongoose ODM
- **API Design**: RESTful endpoints with proper error handling
- **Frontend Architecture**: Next.js 14 with TypeScript
- **Development Workflow**: Integrated tooling and hot reloading

## 📄 License

This project is created for educational and demonstration purposes. Feel free to use it as a learning resource or starting point for your own collaborative applications.

## 🙏 Acknowledgments

- **Tiptap** - Excellent rich text editor framework
- **Socket.io** - Reliable real-time communication
- **Next.js** - Powerful React framework
- **MongoDB** - Flexible document database
- **Tailwind CSS** - Utility-first CSS framework

---

**Happy Collaborating! 🎉**

For questions or issues, please check the implementation details in the source code or create an issue in the repository.
