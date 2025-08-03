"use client";

import CollaborativeEditor from "@/components/CollaborativeEditor";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Document {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const EditorPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const documentId = params.id as string;

  useEffect(() => {
    if (documentId) {
      fetchDocument();
    }
  }, [documentId]);

  const fetchDocument = async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}`);
      const data = await response.json();

      if (data.success) {
        setDocument(data.data);
      } else {
        setError("Document not found");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      setError("Failed to load document");
    } finally {
      setIsLoading(false);
    }
  };

  const copyShareLink = () => {
    const shareLink = window.location.href;
    navigator.clipboard.writeText(shareLink);
    alert(
      `Share link copied to clipboard!\n\nShare this link with others to collaborate:\n${shareLink}`
    );
  };

  const goToDashboard = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {error || "Document not found"}
          </h2>
          <p className="text-gray-600 mb-6">
            The document you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={goToDashboard}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header with document info and share button */}
      <div className="bg-white shadow-sm border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={goToDashboard}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {document.title}
            </h1>
            <p className="text-sm text-gray-500">
              Document ID: {documentId.slice(-8)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={copyShareLink}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <span>📋</span>
            <span>Copy Share Link</span>
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <CollaborativeEditor documentId={documentId} />
      </div>
    </div>
  );
};

export default EditorPage;
