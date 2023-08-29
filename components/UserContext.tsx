import { createContext, useEffect, useState } from "react"

const Context = createContext(null)

type Props = {
  children: React.ReactNode
}

function UserContext({ children }: Props) {
  const [user, setUser] = useState(null)

  // set this up so that there's a clear distinction in lanes between signed-in user and Guest

  useEffect(() => {
    if (user === "Guest-1" || user === "Guest-2") {
      return
    }
    if (window.localStorage.getItem("user") !== null) {
      let currentUser = window.localStorage.getItem("user")
      setUser(currentUser)
    }
  }, [])

  function toggleUser() {
    if (user === "Guest-1" || user === "Guest-2") {
      const newGuest = user === "Guest-1" ? "Guest-2" : "Guest-1"
      setUser(newGuest)
      return
    }
    const newUser = user === "pak" ? "mar" : "pak"
    window.localStorage.setItem("user", newUser)
    setUser(newUser)
  }

  return (
    <Context.Provider value={{ user, setUser, toggleUser }}>
      {children}
    </Context.Provider>
  )
}

export { UserContext, Context }
