"use server";

import { cookies } from "next/headers";

const MANAGE_PASSWORD = process.env.MANAGE_PASSWORD;

export async function loginManage(password: string) {
  if (!MANAGE_PASSWORD) {
    throw new Error("MANAGE_PASSWORD is not configured");
  }

  if (!password) {
    return {
      success: false,
      error: "أدخل كلمة المرور",
    };
  }

  if (password !== MANAGE_PASSWORD) {
    return {
      success: false,
      error: "كلمة المرور غير صحيحة",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("manage_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/manage",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    success: true,
  };
}