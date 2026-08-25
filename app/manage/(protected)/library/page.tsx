import ManageLibraryPage from "@/components/manage/manage-library-page";
import { getArtworks } from "@/lib/actions/get-artworks";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const artworks = await getArtworks();

  return <ManageLibraryPage artworks={artworks} />;
}
