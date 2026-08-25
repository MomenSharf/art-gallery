import Link from "next/link";
import { ArrowUpLeft, Images } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import ManageNavigation from "@/components/manage/manage-navigation";

export default async function ManageProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const session = cookieStore.get("manage_session");

  if (session?.value !== "authenticated") {
    redirect("/manage/login");
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f3ee] text-[#181816]">
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#f5f3ee]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-10">
          <div className="flex items-center gap-3">
            {/* Back to Gallery */}
            <Link
              href="/"
              aria-label="العودة إلى المعرض"
              title="العودة إلى المعرض"
              className="group flex size-9 items-center justify-center rounded-xl border border-black/10 bg-white text-black/40 transition-all hover:-translate-y-0.5 hover:text-black hover:shadow-sm"
            >
              <ArrowUpLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            {/* Brand */}
            <Link
              href="/manage/library"
              className="group flex items-center gap-3"
            >
              <div className="hidden sm:block">
                <p className="text-sm font-medium leading-none">إدارة المعرض</p>

                <p className="mt-1 text-[10px] tracking-[0.16em] text-black/30">
                  ARTIST STUDIO
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <ManageNavigation />
        </div>
      </header>

      <main className="p-1">{children}</main>
    </div>
  );
}
