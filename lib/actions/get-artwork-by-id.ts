"use server";

import prisma from "@/lib/prisma";

import type { Artwork } from "@/types/artwork";

export async function getArtworkById(
  id: string
): Promise<Artwork | null> {
  const artwork = await prisma.artwork.findUnique({
    where: {
      id,
    },
  });

  return artwork;
}