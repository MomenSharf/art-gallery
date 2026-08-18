import Image from "next/image";

import Gallery from "@/components/gallery/gallery";
import GalleryHeader from "@/components/gallery/gallery-header";
import prisma from "@/lib/prisma";

export default async function Home() {
  const artworks = await prisma.artwork.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#181816]">
      <GalleryHeader />

      {/* Artist introduction */}
      <section className="px-5 pb-20 pt-14 md:px-10 md:pb-28 md:pt-20">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
          {/* Artist */}
          <div className="flex items-center gap-5 md:gap-7">
            <div>
              <p className="mb-2 text-xs font-medium tracking-[0.2em] text-black/35">
                الفنان
              </p>

              <h1 className="text-2xl font-medium tracking-tight md:text-4xl">
                اسم الفنان
              </h1>

              <p className="mt-2 text-sm text-black/40 md:text-base">
                فنان ورسام رقمي
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-xl md:text-left">
            <p className="mb-4 text-xs font-medium tracking-[0.25em] text-black/30">
              نبذة
            </p>

            <p className="text-base leading-8 text-black/55 md:text-lg md:leading-9">
              أشارك هنا مجموعة من أعمالي ورسوماتي التي تعكس اهتمامي بالتفاصيل،
              والألوان، والتجارب البصرية. كل عمل يمثل فكرة أو لحظة أو شعورًا
              حاولت تحويله إلى صورة.
            </p>
          </div>
        </div>

        {/* Hero title */}
        <div className="mx-auto mt-20 max-w-[1500px] md:mt-28">
          <p className="mb-5 text-xs font-medium tracking-[0.25em] text-black/35">
            المعرض الفني
          </p>

          <h2 className="max-w-4xl text-5xl font-light leading-[1.15] tracking-tight md:text-7xl lg:text-8xl">
            مساحة للأفكار،
            <br />
            <span className="text-black/35">والألوان، والخيال.</span>
          </h2>
        </div>
      </section>

     {artworks && <Gallery
        artworks={artworks.map(
          ({ id, title, description, year, category, image, colors }) => ({
            id,
            title,
            description,
            year,
            category,
            image,
            colors,
          }),
        )}
      />}
    </main>
  );
}
