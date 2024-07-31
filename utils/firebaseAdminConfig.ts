import admin from "firebase-admin"
import { config } from "dotenv"
import { readFileSync } from "fs"

config()

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
if (!serviceAccountPath) {
  throw new Error(
    "The GOOGLE_APPLICATION_CREDENTIALS environment variable is not set."
  )
}

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"))

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://<DATABASE_NAME>.firebaseio.com", // Update with your database URL
  })
}

const db = admin.firestore()

export { admin, db }
