"use client";

import { motion } from "motion/react";

import { artworks } from "@/data/artworks";
import ArtworkCard from "./artwork-card";

export default function Gallery() {
  return (
    <main className="mx-auto w-full max-w-[1500px] px-5 pb-20 md:px-10 md:pb-32">
      <div className="flex flex-col">
        {artworks.map((artwork, index) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            index={index}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-20 border-t border-black/10 pt-6"
      >
        <div className="flex items-center justify-between text-xs text-black/35">
          <span>نهاية المعرض</span>

          <span>
            {String(artworks.length).padStart(2, "0")} أعمال
          </span>
        </div>
      </motion.div>
    </main>
  );
}