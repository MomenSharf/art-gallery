"use client";

import { motion } from "motion/react";
import Link from "next/link";

const colors = [
  "#D8C7A8",
  "#46513D",
  "#B76E4A",
  "#31343B",
  "#9A8065",
];

const navigation = [
  { label: "الأعمال", href: "#artworks" },
  { label: "عن الفنان", href: "#about" },
  { label: "تواصل", href: "#contact" },
  { label: "إدارة", href: "/manage" },
];

export default function GalleryHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Top row */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex shrink-0 items-center gap-1.5">
              {colors.slice(0, 3).map((color, index) => (
                <motion.span
                  key={color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2 + index * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium tracking-wide text-black">
                معرض
              </p>

              <p className="mt-0.5 truncate text-[10px] text-black/35 sm:mt-1 sm:text-xs">
                مجموعة من الأعمال الفنية
              </p>
            </div>
          </div>

          {/* Navigation - desktop */}
          <nav className="hidden items-center gap-6 text-sm text-black/40 md:flex lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Palette */}
          <div className="flex shrink-0 items-center gap-1.5 md:hidden">
            {colors.map((color) => (
              <span
                key={color}
                className="size-2.5 rounded-full border border-black/10"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Navigation - mobile */}
        <nav
          dir="rtl"
          className="mt-5 flex w-full items-center justify-center gap-1 border-t border-black/[0.06] pt-3 md:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] text-black/45 transition-colors hover:bg-black/[0.04] hover:text-black active:bg-black/[0.06] sm:px-3 sm:text-xs"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Color line */}
        <div className="mt-4 flex h-px w-full overflow-hidden rounded-full md:mt-7">
          {colors.map((color, index) => (
            <motion.div
              key={color}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                backgroundColor: color,
                transformOrigin: "right",
              }}
              className="h-full min-w-0 flex-1"
            />
          ))}
        </div>
      </div>
    </motion.header>
  );
}