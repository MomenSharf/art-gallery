import ArtistIntroduction from "@/components/gallery/artist-introduction";
import Gallery from "@/components/gallery/gallery";
import GalleryHeader from "@/components/gallery/gallery-header";
import { getArtworks } from "@/lib/actions/get-artworks";
import { getProfile } from "@/lib/actions/get-profile";

export default async function Home() {
  const artworks = await getArtworks();
  const profile = await getProfile();
  return (
    <main dir="rtl" className="min-h-screen bg-[#f5f3ee] text-[#181816]">
      <GalleryHeader />

      <ArtistIntroduction profile={profile} />

      <Gallery artworks={artworks} />
    </main>
  );
}
