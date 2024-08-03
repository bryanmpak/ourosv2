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
    throw new Error("no letters found..");
  }

  return recentLetter;
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
  } catch (error) {
    // TODO: check the proper way to do error handling here (client-facing + dev-faving)
    // throw new Error("unable to send letter, ");
    throw new Error(error);
  }

  return "letter sent! :)";
};
