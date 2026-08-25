"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateArtworkInput {
  title: string;
  description: string;
  year: number;
  category: string;
  image: string;
  colors: string[];
}

export async function createArtwork(input: CreateArtworkInput) {
  const cookieStore = await cookies();
  const session = cookieStore.get("manage_session");

  if (session?.value !== "authenticated") {
    throw new Error("غير مصرح");
  }

  const artwork = await prisma.artwork.create({
    data: {
      title: input.title,
      description: input.description,
      year: input.year,
      category: input.category,
      image: input.image,
      colors: input.colors,
    },
  });

  revalidatePath("/manage/library");

  return artwork;
}