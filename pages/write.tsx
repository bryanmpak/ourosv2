import TiptapEditor from "../components/TiptapEditor"
import TextInput from "../components/TextInput"
import { FormEvent, useState } from "react"
import { JSONContent } from "@tiptap/react"
import { toast } from "sonner"

export default function Write() {
  const [editorContent, setEditorContent] = useState<JSONContent>({
    type: "doc",
    content: [],
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch("/api/letters", {
      method: "POST",
      body: JSON.parse(JSON.stringify(editorContent)),
    })

    // add a sonner toast notification based on response, check if this works
    // TODO: need to style the toasts
    if (response.ok) {
      const data = await response.json()
      if (data.firstResult) {
        toast.success(`Latest letter retrieved: ${data.firstResult.content}`)
      } else {
        toast.info("No letters found for the user.")
      }
    } else {
      const errorData = await response.json()
      toast.error(errorData.error || "Failed to retrieve letters.")
    }

    // clear out editorContent state in success
    setEditorContent({
      type: "doc",
      content: [],
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <TextInput /> */}
      <TiptapEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
      <button
        className='mt-4 h-10 w-1/4 border-neutral border-2 rounded-xl font-sans text-text text-sm hover:bg-neutral disabled:pointer-events-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-1'
        type='submit'
      >
        send ❤️
      </button>
    </form>
  )
}
