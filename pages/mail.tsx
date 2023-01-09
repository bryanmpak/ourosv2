import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { Text } from "slate"
import { Context } from "../components/UserContext"
import { db } from "../firebaseConfig"
import HTMLReactParser from "html-react-parser"

export default function Mail() {
  const [letters, setLetters] = useState("")
  const { user } = useContext(Context)

  useEffect(() => {
    async function getDocument() {
      const docArr = []
      const q = query(
        collection(db, `${user === "pak" ? "mar" : "pak"}/data/letters`),
        orderBy("timestamp", "desc"),
        limit(1)
      )
      const querySnapshot = await getDocs(q)
      const queryPromise = querySnapshot.forEach((doc) => {
        // console.log(doc.data())
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

    getDocument()
  }, [])

  return (
    // this one's a little more complicated since i need to parse & return
    // can prob work on this tmrw & copy-pasta into the 'goals' section
    <div>
      <div className="text-title">{HTMLReactParser(letters)}</div>
      <div>tho</div>
    </div>
  )
}
