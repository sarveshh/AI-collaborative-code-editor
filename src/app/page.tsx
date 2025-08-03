import CollaborativeEditor from "@/components/CollaborativeEditor";

export default function Home() {
  // Generate a dummy document ID for demonstration
  const dummyDocumentId = "demo-document-123";

  return (
    <div className="h-screen">
      <CollaborativeEditor documentId={dummyDocumentId} />
    </div>
  );
}
