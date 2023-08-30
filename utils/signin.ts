import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "./firebaseConfig"
import { toast } from "./useToast"

const SHARED_PASSWORD = process.env.NEXT_PUBLIC_SHARED_SECRET

export const signIn = async (
  username: string,
  enteredPassword: string,
  isDemo: boolean
): Promise<void> => {
  if (enteredPassword !== SHARED_PASSWORD) {
    throw new Error("Incorrect password")
  }

  try {
    const userDoc = await getDoc(doc(db, "users", username))
    if (userDoc.exists()) {
      const email = userDoc.data().email

      if (email) {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          enteredPassword
        )
        const user = userCredentials.user
        console.log("User signed in: ", user)
      } else {
        console.log("Email not found")
      }
    } else {
      console.log("Username not found")
    }
  } catch (error) {
    console.log("Error during sign-in:", error)
  }
}
