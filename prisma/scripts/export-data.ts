import { config } from "dotenv"
config()

import { db } from "../../utils/firebaseAdminConfig"
import { prisma } from "../../utils/prisma"

async function exportData() {
  try {
    const lettersSnapshot = await db
      .collection("mar")
      .doc("data")
      .collection("letters")
      .get()

    for (const doc of lettersSnapshot.docs) {
      const docData = doc.data()
      const timestamp = docData.timestamp.toDate()
      console.log(timestamp)
    }
  } catch (error) {
    console.error("Error fetching documents: ", error)
  }
}

exportData()
