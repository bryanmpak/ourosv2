import { config } from "dotenv"
config()

import { db } from "../../src/utils/firebaseAdminConfig"
import { prisma } from "../../src/utils/prisma"

interface Paragraph {
  children: any[] // Define the actual type if known
  type: string
}

interface FirestoreDocument {
  children: Paragraph[]
  author: string
  timestamp: FirebaseFirestore.Timestamp
}

async function exportData() {
  try {
    const lettersSnapshot = await db
      .collection("mar")
      .doc("data")
      .collection("letters")
      .get()

    for (const doc of lettersSnapshot.docs) {
      const docData = doc.data() as FirestoreDocument
      const timestamp = docData.timestamp.toDate()

      for (const child of docData.children) {
      }
    }
  } catch (error) {
    console.error("Error fetching documents: ", error)
  }
}

exportData()
