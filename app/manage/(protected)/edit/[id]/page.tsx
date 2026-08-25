import { notFound } from "next/navigation";

import ArtworkForm from "@/components/manage/artwork-form";
import { getArtworkById } from "@/lib/actions/get-artwork-by-id";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const artwork = await getArtworkById(id);

  if (!artwork) {
    notFound();
  }

  return <ArtworkForm artwork={artwork} />;
}