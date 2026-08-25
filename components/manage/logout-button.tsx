"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { logoutManage } from "@/lib/actions/logout";


export default function LogoutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutManage();

      router.replace("/manage/login");
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className="rounded-lg px-3 py-2 text-xs md:text-sm text-black/40 transition hover:bg-black/5 hover:text-black disabled:opacity-50"
    >
      {pending ? "جاري الخروج..." : "تسجيل الخروج"}
    </button>
  );
}