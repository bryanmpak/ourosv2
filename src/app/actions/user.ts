import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "../../utils/prisma"

export const getUser = async () => {
  const clerkUser = await currentUser()
  console.log('clerkUser',clerkUser)
  if (!clerkUser) {
    return
  }

  const user = await prisma.user.findFirst({
    where: { userId: clerkUser.id },
  })

  return user
}

export const getUserFirstName = async () => {
  const clerkUser = await currentUser()
  if (!clerkUser) {
    return "Guest"
  }

  const user = await prisma.user.findFirst({
    where: { userId: clerkUser.id },
  })
  if (!user) {
    return "Guest"
  }

  return user.firstName
}
