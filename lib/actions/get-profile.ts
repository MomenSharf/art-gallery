"use server";

import { cookies } from "next/headers";

import prisma from "@/lib/prisma";

const ARTIST_PROFILE_ID = "ArtistProfile";

export async function getProfile() {
  const cookieStore = await cookies();

  const session = cookieStore.get("manage_session");

  if (session?.value !== "authenticated") {
    throw new Error("غير مصرح");
  }

  return prisma.artistProfile.upsert({
    where: {
      id: ARTIST_PROFILE_ID,
    },

    update: {},

    create: {
      id: ARTIST_PROFILE_ID,
      name: "",
      availableForWork: false,
    },
  });
}