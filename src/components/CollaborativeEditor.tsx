"use client";

import React, { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import RichTextEditor from "./RichTextEditor";

interface CollaborativeEditorProps {
  documentId: string;
}

interface AIResponse {
  type: "explanation" | "fix";
  content: string;
}

const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({
  documentId,
}) => {
  const [content, setContent] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>("");
  const [isLoadingDocument, setIsLoadingDocument] = useState<boolean>(true);

  // Load initial document content
  useEffect(() => {
    const loadDocument = async () => {
      try {
        const response = await fetch(`/api/documents/${documentId}`);
        const data = await response.json();

        if (data.success && data.data.content) {
          setContent(data.data.content);
        }
      } catch (error) {
        console.error("Error loading document:", error);
      } finally {
        setIsLoadingDocument(false);
      }
    };

    if (documentId) {
      loadDocument();
    }
  }, [documentId]);

  // Initialize Socket.io connection
  useEffect(() => {
    const newSocket = io("http://localhost:5001", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.io server");
      setIsConnected(true);
      // Join the document room
      newSocket.emit("join-document", documentId);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
      setIsConnected(false);
    });

    newSocket.on(
      "receive-changes",
      (data: { content: string; documentId: string }) => {
        if (data.documentId === documentId) {
          setContent(data.content);
        }
      }
    );

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, [documentId]);

  // Handle text selection for AI features
  const handleTextSelection = useCallback(() => {
    // This will be handled by the rich text editor
    // For now, we'll use the selectedText state when needed
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString());
    } else {
      setSelectedText("");
    }
  }, []);

  // Handle content change from rich text editor
  const handleEditorChange = useCallback(
    (newContent: string) => {
      setContent(newContent);
      
      if (socket && socket.connected) {
        socket.emit("send-changes", {
          content: newContent,
          documentId: documentId,
        });
      }
    },
    [socket, documentId]
  );

  // AI Assistant Functions
  const handleExplainCode = useCallback(async () => {
    const codeToExplain = selectedText || stripHtmlTags(content);

    if (!codeToExplain.trim()) {
      alert(
        "Please select some code or ensure there is content in the editor to explain."
      );
      return;
    }

    setIsLoadingAI(true);
    console.log("Explaining code:", codeToExplain);

    try {
      // TODO: Implement actual API call to LLM service
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const preview = codeToExplain.substring(0, 100);
      const truncated = codeToExplain.length > 100 ? "..." : "";

      setAiResponse({
        type: "explanation",
        content: `This is a simulated explanation of the selected code:\n\n"${preview}${truncated}"\n\nThe AI assistant will provide detailed explanations here once the LLM API is integrated.`,
      });
    } catch (error) {
      console.error("Error explaining code:", error);
      alert("Failed to explain code. Please try again.");
    } finally {
      setIsLoadingAI(false);
    }
  }, [selectedText, content]);

  const handleFixCode = useCallback(async () => {
    const codeToFix = selectedText || stripHtmlTags(content);

    if (!codeToFix.trim()) {
      alert(
        "Please select some code or ensure there is content in the editor to fix."
      );
      return;
    }

    setIsLoadingAI(true);
    console.log("Fixing code:", codeToFix);

    try {
      // TODO: Implement actual API call to LLM service
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const preview = codeToFix.substring(0, 100);
      const truncated = codeToFix.length > 100 ? "..." : "";

      setAiResponse({
        type: "fix",
        content: `This is a simulated fix for the selected code:\n\n"${preview}${truncated}"\n\nThe AI assistant will provide bug fixes and improvements here once the LLM API is integrated.`,
      });
    } catch (error) {
      console.error("Error fixing code:", error);
      alert("Failed to fix code. Please try again.");
    } finally {
      setIsLoadingAI(false);
    }
  }, [selectedText, content]);

  const clearAIResponse = useCallback(() => {
    setAiResponse(null);
  }, []);

  // Helper function to strip HTML tags for AI processing
  const stripHtmlTags = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const connectionStatusClass = isConnected ? "text-green-600" : "text-red-600";
  const connectionDotClass = isConnected ? "bg-green-500" : "bg-red-500";

  // Show loading state while document is being loaded
  if (isLoadingDocument) {
    return (
      <div className="flex flex-col h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Collaborative Code Editor
          </h1>
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${connectionStatusClass}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${connectionDotClass}`}
              ></div>
              <span className="text-sm font-medium">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              Document: {documentId}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <div className="flex-1 flex flex-col">
          {/* AI Controls */}
          <div className="bg-white border-b p-4">
            <div className="flex space-x-3">
              <button
                onClick={handleExplainCode}
                disabled={isLoadingAI}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoadingAI ? "Processing..." : "Explain Code"}
              </button>
              <button
                onClick={handleFixCode}
                disabled={isLoadingAI}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoadingAI ? "Processing..." : "Fix Code"}
              </button>
              {selectedText && (
                <span className="text-sm text-gray-600 py-2">
                  Selected: {selectedText.length} characters
                </span>
              )}
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="flex-1 p-4">
            <RichTextEditor
              content={content}
              onChange={handleEditorChange}
              placeholder="Start typing your content here... Use the toolbar to format text, add code blocks, and more!"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* AI Response Panel */}
        {aiResponse && (
          <div className="w-1/3 bg-white border-l border-gray-200">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  AI Assistant -{" "}
                  {aiResponse.type === "explanation"
                    ? "Code Explanation"
                    : "Code Fix"}
                </h3>
                <button
                  onClick={clearAIResponse}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 h-full overflow-y-auto">
              <div className="whitespace-pre-wrap text-sm text-gray-700">
                {aiResponse.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborativeEditor;
