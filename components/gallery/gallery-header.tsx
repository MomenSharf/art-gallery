"use client";

import { motion } from "motion/react";

const colors = [
  "#D8C7A8",
  "#46513D",
  "#B76E4A",
  "#31343B",
  "#9A8065",
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
      className="relative px-5 py-6 md:px-10 md:py-8"
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
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

          <div>
            <p className="text-sm font-medium tracking-wide text-black">
              معرض
            </p>

            <p className="mt-1 text-xs text-black/35">
              مجموعة من الأعمال الفنية
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm text-black/40 sm:flex">
          <button className="transition-colors hover:text-black">
            الأعمال
          </button>

          <button className="transition-colors hover:text-black">
            عن الفنان
          </button>

          <button className="transition-colors hover:text-black">
            تواصل
          </button>
        </nav>

        {/* Palette */}
        <div className="flex items-center gap-1.5 sm:hidden">
          {colors.map((color) => (
            <motion.span
              key={color}
              whileHover={{
                scale: 1.3,
              }}
              className="size-2.5 rounded-full border border-black/10"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Color line */}
      <div className="mx-auto mt-6 flex h-[2px] max-w-[1500px] overflow-hidden rounded-full">
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
            className="h-full flex-1"
          />
        ))}
      </div>
    </motion.header>
  );
}