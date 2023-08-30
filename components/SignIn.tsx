import React, { useState, useEffect, useContext } from "react"
import { collection, getDocs } from "firebase/firestore"
import { signIn } from "../utils/signin"
import { db } from "../utils/firebaseConfig"
import { Context } from "./UserContext"
import { toast } from "../utils/useToast"
import { useRouter } from "next/router"

const SignIn = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernames, setUsernames] = useState<string[]>([])
  const { user, setUser } = useContext(Context)

  const router = useRouter()
  const toastVariant = user !== "mar" || user !== "pak" ? "guest" : "default"

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
    setPassword("")
    try {
      await signIn(username, password, false)
      toast({
        title: "Successfully signed in 🥳",
        description: "Enjoy using the app ❤️",
        variant: toastVariant,
      })
      setUser(username)
      router.push("/")
    } catch (error) {
      // probably add a toast notification here
      toast({
        title: "Error signing in.",
        description: "Please try again.",
        variant: "destructive",
      })
      console.error("Error signing in: ", error)
    }
  }

  const handleGuestLogIn = async () => {
    setUser("Guest-1")
  }

  return (
    <div className="flex flex-col h-1/2 min-h-[300px] font-sans bg-nav_bg border-2 border-neutral rounded-2xl p-8 m-auto items-center justify-center">
      <label htmlFor="username">
        <select
          className="rounded-sm h-[25px] w-[200px] mb-2 px-1"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        >
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
      <label htmlFor="password">
        <input
          className="rounded-sm h-[25px] w-[200px] mb-2 px-1"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button
        className="bg-accent border-2 border-neutral rounded-md p-1 w-1/2 hover:bg-hover"
        onClick={handleSignIn}
      >
        Sign In
      </button>
      <button
        className="text-text text-sm italic hover:underline hover:decoration-shadow"
        onClick={handleGuestLogIn}
      >
        Continue as Guest
      </button>
    </div>
  )
}

export default SignIn
