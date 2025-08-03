import mongoose, { Document as MongoDocument, Schema } from "mongoose";

export interface IDocument extends MongoDocument {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Document title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model re-compilation during development
const Document =
  mongoose.models.Document ||
  mongoose.model<IDocument>("Document", DocumentSchema);

export default Document;
