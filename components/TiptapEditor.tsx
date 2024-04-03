import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, JSONContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Dispatch, SetStateAction, useRef, useState } from "react"

type TiptapEditorProps = {
  editorContent: JSONContent
  setEditorContent: Dispatch<SetStateAction<JSONContent>>
}

const TiptapEditor = ({
  editorContent,
  setEditorContent,
}: TiptapEditorProps) => {
  const menuContainerRef = useRef(null)

  const editor = useEditor({
    onCreate: ({ editor }) => {
      editor.commands.setContent(editorContent)
    },
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getJSON())
    },

    autofocus: true,
    extensions: [
      StarterKit,
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: "letters & dreams",
      }),
    ],
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: "min-h-full",
      },
    },
  })

  return (
    <div
      className='overflow-scroll p-4 text-text text-base border-2 h-[50vh] border-neutral rounded-xl mt-4'
      ref={menuContainerRef}
    >
      {/* TODO: see if i need to have a textmenu */}
      <EditorContent
        editor={editor}
        className='h-full overflow-y-auto text-text font-sans'
      />
    </div>
  )
}

export default TiptapEditor
