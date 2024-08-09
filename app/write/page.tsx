"use client";

import { FormEvent, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { toast } from "sonner";
import TiptapEditor from "../../components/TiptapEditor";
import { createLetter } from "../actions/letters";
import { cn } from "../../utils/utils";

export default function Write() {
  const [editorContent, setEditorContent] = useState<JSONContent>({
    type: "doc",
    content: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const promise = createLetter(editorContent);

    toast.promise(promise, {
      loading: "sending letter...",
      success: "letter sent! 💋",
      error: "failed to send. please send again!",
    });

    promise
      .then(() => {
        // Clear out editorContent state on success
        setEditorContent({
          type: "doc",
          content: [],
        });
      })
      .catch((error) => {
        console.error("Error sending letter:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TiptapEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
      <button
        className={cn(
          "mt-4 h-10 w-1/4 border-light bg-text border-2 rounded-xl font-sans text-nav_bg text-sm hover:bg-hover disabled:pointer-events-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1",
          isSubmitting && "bg-title",
          editorContent.content?.length === 0 && "bg-light"
        )}
        type="submit"
      >
        {isSubmitting ? "sending! ❤️" : "send ❤️"}
      </button>
    </form>
  );
}
