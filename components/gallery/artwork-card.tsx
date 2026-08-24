"use client";

import Image from "next/image";
import { motion } from "motion/react";

import type { Artwork } from "@/types/artwork";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

export default function ArtworkCard({
  artwork,
  index,
}: ArtworkCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 70,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.9,
        delay: 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group border-t border-black/10 py-10 md:py-16 lg:py-20"
    >
      <div
        className={[
          "flex flex-col gap-8 md:items-center md:gap-12 lg:gap-20",
          isReversed ? "md:flex-row-reverse" : "md:flex-row",
        ].join(" ")}
      >
        {/* Artwork */}
        <motion.div
          initial={{ scale: 0.97 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full md:w-[62%]"
        >
          <div className="relative overflow-hidden rounded-[4px] bg-black/[0.03] p-2 sm:p-3">
            <motion.div
              whileHover={{
                scale: 1.015,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-[2px]"
            >
              <Image
                src={artwork.image}
                alt={artwork.title}
                width={1600}
                height={1200}
                sizes="(max-width: 768px) 100vw, 62vw"
                className="block h-auto w-full object-contain"
              />

              {/* Subtle hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-black/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Artwork number */}
              <div className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/85 text-[10px] font-medium text-black/60 shadow-sm backdrop-blur-md">
                {String(index + 1).padStart(2, "0")}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Information */}
        <motion.div
          initial={{
            opacity: 0,
            x: isReversed ? 25 : -25,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex w-full flex-col justify-center md:w-[38%]"
        >
          {/* Category + date */}
          <div className="mb-7 flex items-center justify-between border-b border-black/10 pb-4">
            <span className="text-xs font-medium text-black/45">
              {artwork.category}
            </span>

            <span className="text-xs text-black/35">
              {artwork.year}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-light leading-tight tracking-tight text-black md:text-5xl lg:text-6xl">
            {artwork.title}
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-md text-sm leading-8 text-black/50 md:text-base">
            {artwork.description}
          </p>

          {/* Colors */}
          <div className="mt-10 flex items-center gap-2">
            <span className="ml-2 text-[10px] uppercase tracking-widest text-black/30">
              الألوان
            </span>

            <div className="flex flex-wrap gap-1.5">
              {artwork.colors.map((color) => (
                <motion.span
                  key={color}
                  whileHover={{
                    scale: 1.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                  className="size-4 rounded-full border border-black/10"
                  style={{
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-12 h-px max-w-[180px] bg-black/15"
          />
        </motion.div>
      </div>
    </motion.article>
  );
}