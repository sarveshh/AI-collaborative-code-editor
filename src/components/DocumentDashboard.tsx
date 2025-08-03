"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Document {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const DocumentDashboard: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  // Fetch existing documents
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/documents");
      const data = await response.json();
      if (data.success) {
        setDocuments(data.data);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createDocument = async () => {
    if (!newDocTitle.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newDocTitle.trim(),
          content:
            "// Welcome to the collaborative editor!\n// Start typing to begin...\n\n",
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Navigate to the new document
        router.push(`/editor/${data.data._id}`);
      } else {
        alert("Failed to create document");
      }
    } catch (error) {
      console.error("Error creating document:", error);
      alert("Failed to create document");
    } finally {
      setIsCreating(false);
      setNewDocTitle("");
    }
  };

  const joinDocument = (documentId: string) => {
    router.push(`/editor/${documentId}`);
  };

  const copyShareLink = (documentId: string) => {
    const shareLink = `${window.location.origin}/editor/${documentId}`;
    navigator.clipboard.writeText(shareLink);
    alert(
      `Share link copied to clipboard!\n\nShare this link with others to collaborate:\n${shareLink}`
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Collaborative Code Editor
          </h1>
          <p className="mt-2 text-gray-600">
            Create a new document or join an existing collaboration session
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New Document */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Create New Document
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
              placeholder="Enter document title..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && createDocument()}
            />
            <button
              onClick={createDocument}
              disabled={!newDocTitle.trim() || isCreating}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isCreating ? "Creating..." : "Create & Edit"}
            </button>
          </div>
        </div>

        {/* Existing Documents */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Documents
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Click to join a collaboration session
            </p>
          </div>

          {documents.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 text-lg mb-2">📄</div>
              <p className="text-gray-600">No documents yet</p>
              <p className="text-sm text-gray-500">
                Create your first document to get started
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <div
                  key={doc._id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {doc.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>Created: {formatDate(doc.createdAt)}</span>
                        <span>Updated: {formatDate(doc.updatedAt)}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          ID: {doc._id.slice(-8)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => copyShareLink(doc._id)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        📋 Copy Link
                      </button>
                      <button
                        onClick={() => joinDocument(doc._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Join Session
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            How to Collaborate
          </h3>
          <div className="space-y-2 text-blue-800">
            <p>
              <strong>1. Create</strong> a new document or <strong>join</strong>{" "}
              an existing one
            </p>
            <p>
              <strong>2. Copy the share link</strong> and send it to
              collaborators
            </p>
            <p>
              <strong>3. Multiple users</strong> can edit simultaneously in
              real-time
            </p>
            <p>
              <strong>4. Changes are saved</strong> automatically to the
              database
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDashboard;
