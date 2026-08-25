"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateArtworkInput {
  id: string;
  title: string;
  description: string;
  year: number;
  category: string;
  image: string;
  colors: string[];
}

export async function updateArtwork(input: UpdateArtworkInput) {
  const cookieStore = await cookies();
  const session = cookieStore.get("manage_session");

  if (session?.value !== "authenticated") {
    throw new Error("غير مصرح");
  }

  const artwork = await prisma.artwork.update({
    where: {
      id: input.id,
    },
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
  revalidatePath(`/manage/edit/${input.id}`);

  return artwork;
}