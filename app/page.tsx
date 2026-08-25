import ArtistIntroduction from "@/components/gallery/artist-introduction";
import Gallery from "@/components/gallery/gallery";
import GalleryHeader from "@/components/gallery/gallery-header";
import prisma from "@/lib/prisma";

const ARTIST_PROFILE_ID = "ArtistProfile";

export default async function Home() {
  const [artworks, profile] = await Promise.all([
    prisma.artwork.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.artistProfile.findUnique({
      where: {
        id: ARTIST_PROFILE_ID,
      },
    }),
  ]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f5f3ee] text-[#181816]"
    >
      <GalleryHeader />

      <ArtistIntroduction profile={profile} />

      <Gallery artworks={artworks} />
    </main>
  );
}