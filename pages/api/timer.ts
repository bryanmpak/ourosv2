import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../utils/prisma"
import { endOfDay, startOfDay } from "date-fns"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = "abcd"
  const timeElapsed = req.body

  if (req.method === "POST") {
    try {
      await prisma.timer.create({
        data: {
          userId,
          timeElapsed,
        },
      })
      res.status(200).json({ message: "time logged" })
    } catch (err) {
      res.status(500).json({ error: "failed to log time" })
    }
  } else {
    try {
      const now = new Date()
      const startOfDayTimestamp = startOfDay(now).toISOString()
      const endOfDayTimestamp = endOfDay(now).toISOString()

      const currentDayRecords = await prisma.timer.findMany({
        where: {
          userId,
          createdAt: {
            gte: startOfDayTimestamp,
            lte: endOfDayTimestamp,
          },
        },
      })

      const timeElapsed = currentDayRecords.reduce(
        (total, record) => total + record.timeElapsed,
        0
      )

      return res.status(200).json({ timeElapsed })
    } catch (err) {
      res.status(500).json({ error: "failed to retrieve time elapsed" })
    }
  }
}
