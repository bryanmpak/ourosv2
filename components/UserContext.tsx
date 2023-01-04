import { createContext, useEffect, useState } from "react"

const Context = createContext(null)

function UserContext({ children }) {
  const [user, setUser] = useState("pak")

  useEffect(() => {
    // not sure if this does the trick, since an "else" statement with a
    // state setter function will re-render..? causing infinite loop
    if (window.localStorage.getItem("user") !== null) {
      let currentUser = window.localStorage.getItem("user")
      setUser(currentUser)
    }
  }, [])

  function toggleUser() {
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
