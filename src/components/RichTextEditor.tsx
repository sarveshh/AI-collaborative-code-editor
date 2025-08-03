"use client";

import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createLowlight } from "lowlight";
import React from "react";

// Import languages for code highlighting
import cpp from "highlight.js/lib/languages/cpp";
import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

// Create lowlight instance and register languages
const lowlight = createLowlight();
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("python", python);
lowlight.register("java", java);
lowlight.register("cpp", cpp);
lowlight.register("css", css);
lowlight.register("html", html);
lowlight.register("json", json);

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = "Start typing...",
  className = "",
  editable = true,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block to use lowlight version
      }),
      Typography,
      Color,
      TextStyle,
      CharacterCount,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
      }),
    ],
    content,
    editable,
    immediatelyRender: false, // Fix SSR hydration mismatch
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 ${className}`,
      },
    },
  });

  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-gray-50 rounded-lg">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Toolbar */}
      {editable && (
        <div className="border border-gray-300 border-b-0 rounded-t-lg bg-gray-50 p-3 flex flex-wrap gap-2">
          {/* Text Formatting */}
          <div className="flex gap-1 border-r pr-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                editor.isActive("bold")
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                editor.isActive("italic")
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              <em>I</em>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                editor.isActive("strike")
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              <span className="line-through">S</span>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors font-mono ${
                editor.isActive("code")
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              {"</>"}
            </button>
          </div>

          {/* Headings */}
          <div className="flex gap-1 border-r pr-2">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                editor.isActive("heading", { level: 1 })
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                editor.isActive("heading", { level: 2 })
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              H2
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                editor.isActive("heading", { level: 3 })
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              H3
            </button>
          </div>

          {/* Lists */}
          <div className="flex gap-1 border-r pr-2">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                editor.isActive("bulletList")
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              • List
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                editor.isActive("orderedList")
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              1. List
            </button>
          </div>

          {/* Code Block */}
          <div className="flex gap-1 border-r pr-2">
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors font-mono ${
                editor.isActive("codeBlock")
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              {"{ }"}
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                editor.isActive("blockquote")
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              " Quote
            </button>
          </div>

          {/* Utility */}
          <div className="flex gap-1">
            <button
              onClick={() => editor.chain().focus().setHardBreak().run()}
              className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
              type="button"
            >
              Break
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              type="button"
            >
              ↶ Undo
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              type="button"
            >
              ↷ Redo
            </button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="border border-gray-300 rounded-b-lg bg-white min-h-[300px]">
        <EditorContent
          editor={editor}
          className="min-h-[300px]"
          placeholder={placeholder}
        />
      </div>

      {/* Word Count */}
      {editable && (
        <div className="mt-2 text-xs text-gray-500 text-right">
          {editor.storage.characterCount?.characters() || 0} characters,{" "}
          {editor.storage.characterCount?.words() || 0} words
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
