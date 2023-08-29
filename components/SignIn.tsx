import React, { useState, useEffect, useContext } from "react"
import { collection, getDocs } from "firebase/firestore"
import { signIn } from "../utils/signin"
import { db } from "../utils/firebaseConfig"
import { Context } from "./UserContext"

const SignIn = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernames, setUsernames] = useState<string[]>([])
  const { user, setUser } = useContext(Context)

  console.log(user)

  useEffect(() => {
    const fetchUsernames = async () => {
      const querySnapshot = await getDocs(collection(db, "users"))
      const usernamesArray: string[] = []
      querySnapshot.forEach((doc) => {
        usernamesArray.push(doc.id)
      })
      setUsernames(usernamesArray)
    }
    fetchUsernames()
  }, [])

  const handleSignIn = async () => {
    try {
      await signIn(username, password, false)
      console.log("Successfully signed in")
      setUser(username)
    } catch (error) {
      // probably add a toast notification here
      console.error("Error signing in: ", error)
    }
  }

  const handleGuestLogIn = async () => {
    setUser("Guest-1")
  }

  return (
    <div className="flex flex-col">
      <label>
        Username:
        <select value={username} onChange={(e) => setUsername(e.target.value)}>
          <option value="" disabled>
            Select Username
          </option>
          {usernames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Password:
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleGuestLogIn}>Continue as Guest</button>
    </div>
  )
}

export default SignIn
