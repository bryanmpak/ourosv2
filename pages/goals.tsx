import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { Text } from "slate"
import { Context } from "../components/UserContext"
import { db } from "../firebaseConfig"
import parse from "html-react-parser"

export default function Goals() {
  const [goals, setGoals] = useState([])
  const { user } = useContext(Context)

  async function getDocument() {
    const docArr = []
    const querySnapshot = await getDocs(collection(db, "goals"))
    querySnapshot.forEach((doc) => {
      docArr.push(doc.data())
    })

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
    const test = docArr.map((doc) => serialize(doc))
    setGoals(test)
  }

  getDocument()

  return (
    <div className="text-title font-sans p-4 overflow-scroll text-sm">
      {parse(goals[0])}
      {parse(goals[1])}
    </div>
  )
}
