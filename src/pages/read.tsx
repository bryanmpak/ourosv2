import { EditorContent, JSONContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useState } from "react"

const Read = () => {
  const [readOnlyContent, setReadOnlyContent] = useState<JSONContent | null>(
    null
  )

  const fetchDocumentContent = async (): Promise<JSONContent> => {
    const response = await fetch("/api/letters")
    return response.json()
  }

  useEffect(() => {
    const fetchContent = async () => {
      const content = await fetchDocumentContent()
      setReadOnlyContent(content)
    }
    fetchContent()
  }, [])

  const editor = useEditor({
    extensions: [StarterKit],
    content: readOnlyContent,
    editable: false, // Make the editor read-only
  })

  return (
    <div>
      {readOnlyContent && (
        <EditorContent
          editor={editor}
          className='h-full overflow-y-auto text-text font-sans'
        />
      )}
    </div>
  )
}

export default Read
