"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../../utils/prisma";
import { JSONContent } from "@tiptap/react";

export const getRecentLetter = async () => {
  const user = await currentUser();
  if (!user) {
    return new Error("not authorized, please sign in & link accounts!");
  }

  const recentLetter = await prisma.letter.findFirst({
    where: {
      user: {
        partnerId: user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!recentLetter) {
    return { message: "no letters found." };
  }

  return recentLetter.content;
};

export const createLetter = async (content: JSONContent) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("not authorized, please sign in & link accounts!");
  }
  try {
    await prisma.letter.create({
      data: {
        content,
        userId: user.id,
      },
    });
    return Promise.resolve("Letter sent!");
  } catch (error) {
    return Promise.reject("Unable to send letter. Please try again.");
  }
};
