import React, { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { signIn } from "../utils/signin"
import { db } from "../utils/firebaseConfig"

const SignIn = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernames, setUsernames] = useState<string[]>([])

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
    } catch (error) {
      console.error("Error signing in: ", error)
    }
  }

  return (
    <div>
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
    </div>
  )
}

export default SignIn
