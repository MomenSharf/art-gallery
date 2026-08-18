"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ManageLogin from "@/components/manage/manage-login";
import ArtworkForm from "@/components/manage/artwork-form";
import ArtworkLibrary from "@/components/manage/artwork-library";

import type { Artwork } from "@/types/artwork";
import Link from "next/link";

type View = "library" | "create" | "edit";

export default function ManagePage() {
  const [authenticated, setAuthenticated] = useState(false);

  const [view, setView] = useState<View>("library");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadArtworks() {
    setLoading(true);

    try {
      const response = await fetch("/api/manage/artworks", {
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = await response.json();

      setArtworks(data.artworks ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authenticated) {
      loadArtworks();
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <ManageLogin
        onSuccess={() => {
          setAuthenticated(true);
        }}
      />
    );
  }

  function handleEdit(artwork: Artwork) {
    setSelectedArtwork(artwork);
    setView("edit");
  }

  function handleCreate() {
    setSelectedArtwork(null);
    setView("create");
  }

  function backToLibrary() {
    setSelectedArtwork(null);
    setView("library");
    loadArtworks();
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-5 py-8 text-[#181816] md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-black/30">
              إدارة المعرض
            </p>

            <h1 className="mt-2 text-2xl font-light tracking-tight">
              لوحة التحكم
            </h1>
          </div>

          <button
            type="button"
            onClick={() => {
              setAuthenticated(false);
              setView("library");
            }}
            className="rounded-lg px-3 py-2 text-sm text-black/40 transition-colors hover:bg-black/5 hover:text-black"
          >
            تسجيل الخروج
          </button>
          <Link
            href="/"
            className="flex gap-1 rounded-lg px-3 py-2 text-sm text-black/40 transition-colors hover:bg-black/5 hover:text-black"
          >
            المكتبة
            <ArrowLeft className="size-4" />
          </Link>
        </header>

        {view !== "library" ? (
          <button
            type="button"
            onClick={backToLibrary}
            className="mb-6 flex items-center gap-2 text-sm text-black/40 hover:text-black"
          >
            <ArrowRight className="size-4" />
            المكتبة
          </button>
        ) : null}

        {view === "library" ? (
          <ArtworkLibrary
            artworks={artworks}
            onEdit={handleEdit}
            onAdd={handleCreate}
          />
        ) : (
          <ArtworkForm
            artwork={view === "edit" ? selectedArtwork : null}
            onCreated={backToLibrary}
            onUpdated={backToLibrary}
            onCancel={backToLibrary}
          />
        )}

        {loading && view === "library" ? (
          <p className="mt-4 text-xs text-black/30">جاري تحميل الأعمال...</p>
        ) : null}
      </div>
    </main>
  );
}
