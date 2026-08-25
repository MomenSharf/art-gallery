import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f5f3ee] px-5 py-8 text-[#181816] md:px-10"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Header skeleton */}
        <header className="mb-10 flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-3 w-24 animate-pulse rounded-full bg-black/[0.06]" />
            <div className="h-8 w-36 animate-pulse rounded-lg bg-black/[0.07]" />
          </div>

          <div className="flex gap-2">
            <div className="hidden h-10 w-24 animate-pulse rounded-xl bg-black/[0.05] sm:block" />
            <div className="h-10 w-10 animate-pulse rounded-xl bg-black/[0.05] sm:w-24" />
          </div>
        </header>

        {/* Page heading */}
        <div className="mb-7 space-y-3">
          <div className="h-3 w-14 animate-pulse rounded-full bg-black/[0.06]" />
          <div className="h-9 w-48 animate-pulse rounded-lg bg-black/[0.07]" />
          <div className="h-4 w-32 animate-pulse rounded-full bg-black/[0.05]" />
        </div>

        {/* Search */}
        <div className="mb-6 h-12 w-full animate-pulse rounded-xl bg-white/70" />

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white"
            >
              <div className="aspect-[4/3] animate-pulse bg-black/[0.045]" />

              <div className="space-y-4 p-4">
                <div className="flex justify-between">
                  <div className="h-3 w-16 animate-pulse rounded-full bg-black/[0.06]" />
                  <div className="h-3 w-10 animate-pulse rounded-full bg-black/[0.05]" />
                </div>

                <div className="h-6 w-32 animate-pulse rounded-md bg-black/[0.07]" />

                <div className="space-y-2">
                  <div className="h-3 w-full animate-pulse rounded-full bg-black/[0.045]" />
                  <div className="h-3 w-4/5 animate-pulse rounded-full bg-black/[0.045]" />
                </div>

                <div className="flex gap-1.5">
                  <div className="size-3 animate-pulse rounded-full bg-black/[0.08]" />
                  <div className="size-3 animate-pulse rounded-full bg-black/[0.08]" />
                  <div className="size-3 animate-pulse rounded-full bg-black/[0.08]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small loading indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-black/30">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-xs">جاري تحميل المكتبة</span>
        </div>
      </div>
    </main>
  );
}