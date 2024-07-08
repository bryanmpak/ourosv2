import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "../../utils/prisma"

export const createLink = async (partnerEmail: string, passcode: string) => {
  const user = await currentUser()
  if (!user) {
    throw new Error("unauthorized")
  }

  try {
    const link = await prisma.accountLink.upsert({
      where: {
        unique_user_partnerEmail: {
          userId: user.id,
          partnerEmail: partnerEmail,
        },
      },
      create: {
        userId: user.id,
        partnerEmail: partnerEmail,
        passcode: passcode,
      },
      update: {
        passcode: passcode,
      },
      select: {
        id: true, // Select only the necessary fields
      },
    })
    return link
  } catch (err) {
    console.error("Error creating entry:", err)
  }
}

export const submitLink = async (partnerEmail: string, passcode: string) => {
  const user = await currentUser()
  if (!user) {
    throw new Error("unauthorized")
  }

  const submit = await prisma.accountLink.findFirst({
    where: {
      partnerEmail,
    },
    select: {
      id: true,
      userId: true,
      partnerEmail: true,
      passcode: true,
      partnerId: true,
    },
  })
  if (!submit || submit.partnerEmail !== partnerEmail) {
    throw new Error("request not found or you're not the intended recipient")
  }
  if (submit.passcode !== passcode) {
    throw new Error("incorrect passcode")
  }
  await prisma.accountLink.update({
    where: {
      id: submit.id,
    },
    data: {
      partnerId: user.id,
    },
  })
  if (!!submit.partnerId) {
    // update submitting user isAccountLinked to true + tie partners userid
    await prisma.user.update({
      where: {
        userId: submit.partnerId,
      },
      data: {
        isAccountLinked: true,
        partnerId: submit.userId,
      },
    })

    // update creating user isAccountLinked to true + tie partners userid
    await prisma.user.update({
      where: {
        userId: submit.userId,
      },
      data: {
        isAccountLinked: true,
        partnerId: submit.partnerId,
      },
    })
  }
}
