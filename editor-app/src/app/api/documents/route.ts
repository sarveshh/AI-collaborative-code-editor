import dbConnect from "@/lib/mongodb";
import Document from "@/models/Document";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const documents = await Document.find({}).sort({ updatedAt: -1 }).limit(10);

    return NextResponse.json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { title, content = "" } = await request.json();

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { error: "Document title is required" },
        { status: 400 }
      );
    }

    const document = new Document({
      title: title.trim(),
      content,
    });

    const savedDocument = await document.save();

    return NextResponse.json(
      {
        success: true,
        data: savedDocument,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating document:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation error", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
