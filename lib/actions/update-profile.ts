"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export interface UpdateProfileInput {
  name: string;
  bio: string;
  phone: string;
  email: string;
  location: string;
  avatar: string;
  website: string;
  instagram: string;
  facebook: string;
  x: string;
  behance: string;
  dribbble: string;
  artStyle: string;
  specialty: string;
  availableForWork: boolean;
}

export async function updateProfile(
  input: UpdateProfileInput
) {
  const cookieStore = await cookies();

  const session = cookieStore.get("manage_session");

  if (session?.value !== "authenticated") {
    throw new Error("غير مصرح");
  }

  if (!input.name.trim()) {
    throw new Error("أدخل اسم الفنان");
  }

  const existing = await prisma.artistProfile.findFirst({
    orderBy: {
      createdAt: "asc",
    },
  });

  const data = {
    name: input.name.trim(),
    bio: input.bio.trim() || null,
    phone: input.phone.trim() || null,
    email: input.email.trim() || null,
    location: input.location.trim() || null,
    avatar: input.avatar.trim() || null,
    website: input.website.trim() || null,
    instagram: input.instagram.trim() || null,
    facebook: input.facebook.trim() || null,
    x: input.x.trim() || null,
    behance: input.behance.trim() || null,
    dribbble: input.dribbble.trim() || null,
    artStyle: input.artStyle.trim() || null,
    specialty: input.specialty.trim() || null,
    availableForWork: input.availableForWork,
  };

  const profile = existing
    ? await prisma.artistProfile.update({
        where: {
          id: existing.id,
        },
        data,
      })
    : await prisma.artistProfile.create({
        data,
      });

  revalidatePath("/manage/profile");
  revalidatePath("/");

  return profile;
}