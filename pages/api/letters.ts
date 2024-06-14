import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../utils/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = "userxyz"
  const content = req.body

  if (req.method === "POST") {
    try {
      await prisma.letter.create({
        data: {
          userId,
          content,
        },
      })
      res.status(200).json({ message: "letter sent!" })
    } catch (err) {
      res.status(500).json({ error: "failed to send letter" })
    }
  } else {
    try {
      const partnerId = await prisma.user.findUnique({
        where: { userId },
        select: { partnerId: true },
      })

      const firstResult = await prisma.letter.findFirst({
        where: {
          userId: partnerId.partnerId,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      res.status(200).json({ firstResult })
    } catch (err) {
      res.status(500).json({ error: "failed to retrieve data" })
    }
  }
}
