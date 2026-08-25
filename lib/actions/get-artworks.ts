"use server";

import prisma from "@/lib/prisma";
import type { Artwork } from "@/types/artwork";

export async function getArtworks(): Promise<Artwork[]> {
  try {
    const artworks = await prisma.artwork.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return artworks;
  } catch (error) {
    console.error("Failed to get artworks:", error);

    return [];
  }
}