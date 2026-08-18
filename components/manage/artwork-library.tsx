"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  Edit3,
  ImageIcon,
  Plus,
  Search,
} from "lucide-react";
import type { Artwork } from "@/types/artwork";
import { useState } from "react";

interface ArtworkLibraryProps {
  artworks: Artwork[];
  onEdit: (artwork: Artwork) => void;
  onAdd: () => void;
}

export default function ArtworkLibrary({
  artworks,
  onEdit,
  onAdd,
}: ArtworkLibraryProps) {
  const [query, setQuery] = useState("");

  const filteredArtworks = artworks.filter((artwork) => {
    const value = query.toLowerCase();

    return (
      artwork.title.toLowerCase().includes(value) ||
      artwork.category.toLowerCase().includes(value) ||
      artwork.year.toString().includes(value)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-black/30">
            الأعمال
          </p>

          <h2 className="mt-2 text-2xl font-light tracking-tight sm:text-3xl">
            مكتبة الأعمال
          </h2>

          <p className="mt-2 text-sm text-black/40">
            {artworks.length} أعمال محفوظة
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#181816] px-5 text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Plus className="size-4" />
          إضافة عمل
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-black/25" />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ابحث عن عمل..."
          className="h-12 w-full rounded-xl border border-black/10 bg-white pr-11 pl-4 text-sm outline-none transition-all placeholder:text-black/25 focus:border-black/25 focus:ring-4 focus:ring-black/[0.03]"
        />
      </div>

      {/* Grid */}
      {filteredArtworks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredArtworks.map((artwork, index) => (
            <motion.article
              key={artwork.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eeece7]">
                {artwork.image ? (
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-black/20">
                    <ImageIcon className="size-7" />
                  </div>
                )}

                {/* Number */}
                <div className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/85 text-[10px] text-black/60 backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Edit */}
                <button
                  type="button"
                  onClick={() => onEdit(artwork)}
                  className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-white/90 text-black/60 opacity-100 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:text-black sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label={`تعديل ${artwork.title}`}
                >
                  <Edit3 className="size-4" />
                </button>
              </div>

              {/* Information */}
              <div className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-black/40">
                    {artwork.category}
                  </span>

                  <span className="text-xs text-black/30">
                    {artwork.year}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-light tracking-tight">
                  {artwork.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-7 text-black/40">
                  {artwork.description}
                </p>

                {/* Colors */}
                <div className="mt-4 flex items-center gap-1.5">
                  {artwork.colors?.map((color, colorIndex) => (
                    <span
                      key={`${color}-${colorIndex}`}
                      className="size-3 rounded-full border border-black/10"
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/10 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-black/[0.04]">
            <Search className="size-5 text-black/25" />
          </div>

          <p className="mt-4 text-sm text-black/40">
            لا توجد أعمال مطابقة للبحث
          </p>
        </div>
      )}
    </div>
  );
}