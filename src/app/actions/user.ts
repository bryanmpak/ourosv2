import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "../../utils/prisma"

export const getUser = async () => {
  const clerkUser = await currentUser()
  if (!clerkUser) {
    return null
  }

  const user = await prisma.user.findFirst({
    where: { userId: clerkUser.id },
  })

  return user
}
