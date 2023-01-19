import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import isHotkey from "is-hotkey"
import { useCallback, useContext, useState } from "react"
import { BaseEditor, createEditor, Descendant, Editor } from "slate"
import { Editable, ReactEditor, Slate, withReact } from "slate-react"
import { db } from "../firebaseConfig"
import { Context } from "./UserContext"

type CustomElement = { type: "paragraph"; children: CustomText[] }
type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      { text: "letters", bold: true },
      { text: " & " },
      { text: "dreams", italic: true },
    ],
  },
]

export default function TextInput() {
  const [editor] = useState(() => withReact(createEditor()))
  const [text, setText] = useState("")
  const [editorValue, setEditorValue] = useState(initialValue)
  const { user } = useContext(Context)

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])

  function saveLetter() {
    const docRef = addDoc(collection(db, `${user}/data/letters`), {
      timestamp: serverTimestamp(),
      author: user,
      children: text,
    })
    setEditorValue(initialValue)
  }

  function saveGoals() {
    const docRef = addDoc(collection(db, `goals`), {
      timestamp: serverTimestamp(),
      author: user,
      children: text,
    })
    setEditorValue(initialValue)
  }

  return (
    // change this div structure to (main div = text div + button div )
    <div className="flex flex-col font-sans h-full">
      <div className="overflow-scroll grow p-4 text-text text-sm border-2 border-neutral rounded-xl">
        <Slate
          editor={editor}
          value={editorValue}
          onChange={(value) => {
            const isAstChange = editor.operations.some(
              (op) => "set_selection" !== op.type
            )
            if (isAstChange) {
              const content = value
              setText(content)
            }
          }}
        >
          <Editable
            placeholder="type away!"
            autoFocus
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey]
                  toggleMark(editor, mark)
                }
              }
            }}
          />
        </Slate>
      </div>

      <div className="flex justify-between">
        <button
          className="my-3 h-10 w-1/4 border-neutral border-2 rounded-xl font-sans text-text text-sm hover:bg-neutral"
          onClick={() => saveLetter()}
        >
          send ❤️
        </button>
        <button
          className="my-3 h-10 w-1/4 border-neutral border-2 rounded-xl font-sans text-text text-sm hover:bg-neutral"
          onClick={() => saveGoals()}
        >
          submit 🎯
        </button>
      </div>
    </div>
  )
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}
