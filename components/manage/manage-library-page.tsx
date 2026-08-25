"use client";

import Link from "next/link";
import { Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";

import ArtworkLibrary from "@/components/manage/artwork-library";
import type { Artwork } from "@/types/artwork";
import { deleteArtwork } from "@/lib/actions/delete-artwork";

interface ManageLibraryPageProps {
  artworks: Artwork[];
}

export default function ManageLibraryPage({
  artworks,
}: ManageLibraryPageProps) {
  const router = useRouter();

  function handleEdit(artwork: Artwork) {
    router.push(`/manage/edit/${artwork.id}`);
  }

  function handleAdd() {
    router.push("/manage/new");
  }

  async function handleDelete(artwork: Artwork) {
  await deleteArtwork(artwork.id);

  router.refresh();
}

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-5 py-8 text-[#181816] md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <ArtworkLibrary
          artworks={artworks}
          onEdit={handleEdit}
          onAdd={handleAdd}
            onDelete={handleDelete}

        />
      </div>
    </main>
  );
}
