"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type ReadOnlyEditorProps = {
  readOnlyContent: any;
};

const ReadOnlyEditor = ({ readOnlyContent }: ReadOnlyEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: readOnlyContent,
    editable: false, // Make the editor read-only
  });

  return (
    <EditorContent
      editor={editor}
      className="h-full overflow-y-auto text-text font-sans"
    />
  );
};

export default ReadOnlyEditor;
