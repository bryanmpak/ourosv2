import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { Text } from "slate"
import { Context } from "../components/UserContext"
import { db } from "../utils/firebaseConfig"
import parse from "html-react-parser"

export default function Mail() {
  const [letters, setLetters] = useState("")
  const { user } = useContext(Context)

  // can prob move this to a helper file
  async function getDocument() {
    const docArr = []
    const q = query(
      collection(db, `${user === "pak" ? "mar" : "pak"}/data/letters`),
      orderBy("timestamp", "desc"),
      limit(1)
    )
    const querySnapshot = await getDocs(q)
    const queryPromise = querySnapshot.forEach((doc) => {
      docArr.push(doc.data())
    })
    const docData = docArr[0]

    const serialize = (node) => {
      if (Text.isText(node)) {
        let string = node.text
        if (node.bold) {
          string = `<strong>${string}</strong>`
        } else if (node.italic) {
          string = `<em>${string}</em>`
        } else if (node.underline) {
          string = `<u>${string}</u>`
        }
        return string
      }

      const children = node.children.map((n) => serialize(n)).join("")

      switch (node.type) {
        case "quote":
          return `<blockquote><p>${children}</p></blockquote>`
        case "paragraph":
          return `<p className="mb-2">${children}</p>`
        default:
          return children
      }
    }
    setLetters(serialize(docData))
  }

  useEffect(() => {
    if (user) {
      // Check if user is not null or undefined
      getDocument()
    }
  }, [user])

  return (
    <div className="text-title font-sans p-4 overflow-scroll text-sm">
      {parse(letters)}
    </div>
  )
}
