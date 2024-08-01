"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../../utils/prisma";
import { revalidatePath } from "next/cache";
import { startOfDay, endOfDay, addHours, subHours } from "date-fns";

const JST_OFFSET = 9; // JST is UTC+9

export const getDailyStreak = async () => {
  const user = await currentUser();
  if (!user) {
    return 0;
  }

  // Get the current date in JST by adding 9 hours to UTC
  const nowInJST = addHours(new Date(), JST_OFFSET);

  // Calculate the start and end of the current day in JST
  const startOfTodayJST = startOfDay(nowInJST);
  const endOfTodayJST = endOfDay(nowInJST);

  // Convert JST range back to UTC for database query
  const startOfTodayUTC = subHours(startOfTodayJST, JST_OFFSET);
  const endOfTodayUTC = subHours(endOfTodayJST, JST_OFFSET);

  const dailyEntries = await prisma.timer.findMany({
    where: {
      userId: user.id,
      createdAt: {
        gte: startOfTodayUTC,
        lte: endOfTodayUTC,
      },
    },
    select: {
      timeElapsed: true,
    },
  });

  // Sum up the durations
  const dailyStreak = dailyEntries.reduce(
    (sum, entry) => sum + entry.timeElapsed,
    0
  );

  return dailyStreak;
};

export const addTimeElapsed = async (timeElapsed: number) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("please log in to add to daily streak");
  }

  await prisma.timer.create({
    data: {
      userId: user.id,
      timeElapsed,
    },
  });

  revalidatePath("/pomodoro");

  return "great work! keep it up!";
};
