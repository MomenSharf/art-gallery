"use server";

import { cookies } from "next/headers";

export async function logoutManage() {
  const cookieStore = await cookies();

  cookieStore.delete("manage_session");
}