"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ManageLogin from "@/components/manage/manage-login";
import ArtworkForm from "@/components/manage/artwork-form";
import ArtworkLibrary from "@/components/manage/artwork-library";

import type { Artwork } from "@/types/artwork";

type View = "library" | "create" | "edit";

export default function ManagePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [view, setView] = useState<View>("library");
  const [selectedArtwork, setSelectedArtwork] =
    useState<Artwork | null>(null);

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadArtworks() {
    setLoading(true);

    try {
      const response = await fetch("/api/manage/artworks", {
        cache: "no-store",
      });

      if (!response.ok) {
        setArtworks([]);
        return;
      }

      const data = await response.json();
      setArtworks(data.artworks ?? []);
    } catch {
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  }

  function handleLogin() {
    setAuthenticated(true);
    loadArtworks();
  }

  function handleCreate() {
    setSelectedArtwork(null);
    setView("create");
  }

  function handleEdit(artwork: Artwork) {
    setSelectedArtwork(artwork);
    setView("edit");
  }

  function handleBack() {
    setView("library");
    setSelectedArtwork(null);
    loadArtworks();
  }

  function handleLogout() {
    setAuthenticated(false);
    setView("library");
    setSelectedArtwork(null);
    setArtworks([]);
  }

  if (!authenticated) {
    return <ManageLogin onSuccess={handleLogin} />;
  }

  const editing = view === "edit";

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-5 py-8 text-[#181816] md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-black/30">
              إدارة المعرض
            </p>

            <h1 className="mt-2 text-2xl font-light tracking-tight">
              لوحة التحكم
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-black/40 transition hover:bg-black/5 hover:text-black"
            >
              المكتبة
              <ArrowLeft className="size-4" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg px-3 py-2 text-sm text-black/40 transition hover:bg-black/5 hover:text-black"
            >
              تسجيل الخروج
            </button>
          </div>
        </header>

        {view !== "library" && (
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 flex items-center gap-2 text-sm text-black/40 transition hover:text-black"
          >
            <ArrowRight className="size-4" />
            المكتبة
          </button>
        )}

        {view === "library" ? (
          <>
            <ArtworkLibrary
              artworks={artworks}
              onEdit={handleEdit}
              onAdd={handleCreate}
            />

            {loading && (
              <p className="mt-4 text-xs text-black/30">
                جاري تحميل الأعمال...
              </p>
            )}
          </>
        ) : (
          <ArtworkForm
            key={editing ? selectedArtwork?.id : "create"}
            artwork={editing ? selectedArtwork : null}
            onCreated={handleBack}
            onUpdated={handleBack}
            onCancel={handleBack}
          />
        )}
      </div>
    </main>
  );
}