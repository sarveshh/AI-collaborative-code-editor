# 🚀 Collaboration Demo Instructions

## Quick Test Setup

1. **Start the application**:

   ```bash
   npm run dev
   ```

2. **Open your browser** to: http://localhost:3000

3. **You should now see**:
   - A "Create New Document" section at the top
   - A "Recent Documents" section below
   - Blue instructions box explaining collaboration

## Testing Real-time Collaboration

### **Step 1: Create a Document**

1. In the "Create New Document" section
2. Type something like "My Test Document"
3. Click "Create & Edit"
4. You'll be taken to the editor page

### **Step 2: Get the Share Link**

1. Click the green "📋 Copy Share Link" button in the top-right
2. You'll get an alert with the shareable URL
3. The URL will look like: `http://localhost:3000/editor/[some-document-id]`

### **Step 3: Test Collaboration**

1. **Open a new browser window/tab**
2. **Paste the share link** you copied
3. **Start typing in either window**
4. **Watch the magic** - text appears in both windows in real-time! ✨

### **Step 4: Test Multiple Sessions**

1. Go back to http://localhost:3000 in either window
2. Create another document
3. You'll see both documents in the "Recent Documents" list
4. Click "Join Session" on any document to switch between them

## What You Should Observe

- ✅ **Real-time typing** sync between windows
- ✅ **Connection status** (green "Connected" indicator)
- ✅ **Auto-save** (documents persist when you refresh)
- ✅ **Document switching** (multiple documents available)
- ✅ **Share functionality** (easy collaboration invitation)

## If You Don't See the New Interface

Check that:

1. MongoDB Atlas is connected (check server logs)
2. Both server (port 5001) and client (port 3000) are running
3. No browser cache issues (try hard refresh: Ctrl+F5)

The join button is now in the dashboard - each document has its own "Join Session" button! 🎉
