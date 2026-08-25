"use server";

import prisma from "@/lib/prisma";

export async function deleteArtwork(id: string) {
  await prisma.artwork.delete({
    where: {
      id,
    },
  });
}