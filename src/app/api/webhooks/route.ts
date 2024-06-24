import { Webhook } from "svix"
import { headers } from "next/headers"
import { WebhookEvent } from "@clerk/nextjs/server"
import { prisma } from "../../../utils/prisma"

export async function POST(req: Request) {
  try {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
      console.error("WEBHOOK_SECRET is not defined")
      throw new Error(
        "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
      )
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("Missing Svix headers")
      return new Response("Error occured -- no svix headers", {
        status: 400,
      })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Log payload and headers for debugging
    console.log("Received payload:", payload)
    console.log("Headers:", { svix_id, svix_timestamp, svix_signature })

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent
    } catch (err) {
      console.error("Error verifying webhook:", err)
      return new Response("Error occured", {
        status: 400,
      })
    }

    const { id } = evt.data
    const eventType = evt.type

    // Log event type and id
    console.log("Event Type:", eventType)
    console.log("Event Data ID:", id)

    if (eventType === "user.created") {
      try {
        const user = await prisma.user.create({
          data: {
            userId: id as string,
          },
        })
        console.log("User created:", user)
      } catch (error) {
        console.error("Error creating user:", error)
      }
    }

    return new Response("Successful push", { status: 200 })
  } catch (error) {
    console.error("Error handling webhook:", error)
    return new Response("Error occured", {
      status: 500,
    })
  }
}
