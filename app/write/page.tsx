"use client";

import { FormEvent, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { toast } from "sonner";
import TiptapEditor from "../../components/TiptapEditor";
import { createLetter } from "../actions/letters";

export default function Write() {
  const [editorContent, setEditorContent] = useState<JSONContent>({
    type: "doc",
    content: [],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createLetter(editorContent);

    // TODO: add a sonner toast notification based on response

    // clear out editorContent state in success
    setEditorContent({
      type: "doc",
      content: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TiptapEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
      {/* TODO: make this button more dynamic -> maybe loading state until completion */}
      <button
        className="mt-4 h-10 w-1/4 border-neutral border-2 rounded-xl font-sans text-text text-sm hover:bg-neutral disabled:pointer-events-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1"
        type="submit"
      >
        send ❤️
      </button>
    </form>
  );
}
