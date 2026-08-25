import prisma from "@/lib/prisma";

const ARTIST_PROFILE_ID = "ArtistProfile";

const artistProfile = {
  id: ARTIST_PROFILE_ID,
  name: "عبد الرحمن الشاذلي",
  bio: "فنان ومصمم بصري من القاهرة، أهتم بالفن الإسلامي والخط العربي والزخارف الهندسية، وأستلهم أعمالي من العمارة المصرية والطبيعة وتفاصيل الحياة اليومية. أحرص في أعمالي على الجمع بين البساطة والهوية البصرية الأصيلة، مع استخدام الألوان الهادئة والتكوينات المتوازنة.",
  avatar:
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=500&q=85",
  location: "القاهرة، مصر",
  email: "abdulrahman@example.com",
  phone: "+20 100 123 4567",
  artStyle: "الفن الإسلامي المعاصر",
  specialty: "الخط العربي والزخارف الهندسية",
  availableForWork: true,
  website: "https://example.com",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  x: "https://x.com",
  behance: "https://behance.net",
  dribbble: "https://dribbble.com",
};

const artworks = [
  {
    title: "نور الفجر",
    description:
      "تكوين هادئ مستوحى من لحظات الفجر الأولى، حيث يلتقي الضوء الناعم مع درجات السماء والأرض في مشهد بسيط ومتوازن.",
    year: 2026,
    category: "مناظر طبيعية",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=85",
    colors: ["#D8C7A8", "#8B7355", "#46513D", "#F1E5CE"],
  },

  {
    title: "حروف من نور",
    description:
      "عمل مستوحى من جمال الخط العربي وتوازن الحروف، مع استخدام درجات ترابية هادئة تمنح التكوين إحساسًا بالسكينة.",
    year: 2026,
    category: "خط عربي",
    image:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1600&q=85",
    colors: ["#31343B", "#D8C7A8", "#9A8065", "#EEE6D8"],
  },

  {
    title: "ساحة المسجد",
    description:
      "مشهد معماري هادئ يركز على الأقواس والتفاصيل الهندسية والضوء الطبيعي داخل الساحات التقليدية.",
    year: 2025,
    category: "عمارة إسلامية",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=85",
    colors: ["#D8C7A8", "#B76E4A", "#46513D", "#F1E5CE"],
  },

  {
    title: "زخارف هندسية",
    description:
      "دراسة بصرية للأنماط الهندسية الإسلامية، تعتمد على التكرار والتناظر لإيجاد إحساس بالترتيب والانسجام.",
    year: 2025,
    category: "زخارف هندسية",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1600&q=85",
    colors: ["#46513D", "#D8C7A8", "#B76E4A", "#31343B"],
  },

  {
    title: "طريق النخيل",
    description:
      "منظر طبيعي مستوحى من الطرق القديمة المحاطة بالنخيل، مع اهتمام بتدرجات الضوء والظلال.",
    year: 2024,
    category: "مناظر طبيعية",
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1600&q=85",
    colors: ["#46513D", "#728064", "#D8C7A8", "#B76E4A"],
  },

  {
    title: "سكون",
    description:
      "تكوين بسيط يجمع بين الضوء والفراغ والعناصر الطبيعية، بهدف خلق مساحة بصرية هادئة للتأمل.",
    year: 2026,
    category: "فن معاصر",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",
    colors: ["#F5F3EE", "#D8D1C5", "#9A8065", "#46513D"],
  },

  {
    title: "باب قديم",
    description:
      "دراسة لتفاصيل الأبواب التقليدية والعمارة القديمة، حيث تظهر آثار الزمن في الخشب والألوان والنقوش.",
    year: 2024,
    category: "تراث وعمارة",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=85",
    colors: ["#B76E4A", "#6E5141", "#D8C7A8", "#46513D"],
  },

  {
    title: "آيات مكتوبة",
    description:
      "تكوين فني يركز على جمال الكتابة العربية وتوازن المساحات، مستوحى من تقاليد الخط والزخرفة الإسلامية.",
    year: 2025,
    category: "خط عربي",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1600&q=85",
    colors: ["#31343B", "#9A8065", "#D8C7A8", "#EEE6D8"],
  },

  {
    title: "هندسة الضوء",
    description:
      "تجربة بصرية تجمع بين الأنماط الهندسية والضوء والظل، مستوحاة من النوافذ والمشربيات التقليدية.",
    year: 2026,
    category: "فن هندسي",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=85",
    colors: ["#46513D", "#31343B", "#D8C7A8", "#B76E4A"],
  },

  {
    title: "هدوء الصحراء",
    description:
      "منظر مفتوح للصحراء يركز على اتساع المكان وتدرجات الرمال والسماء في لحظة هادئة.",
    year: 2023,
    category: "مناظر طبيعية",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",
    colors: ["#D8C7A8", "#C5B29A", "#EEE6D8", "#8B7355"],
  },

  {
    title: "المحراب",
    description:
      "دراسة فنية مستوحاة من الأقواس والزخارف المعمارية الإسلامية، مع التركيز على التناظر والتفاصيل.",
    year: 2025,
    category: "عمارة إسلامية",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=85",
    colors: ["#46513D", "#D8C7A8", "#9A8065", "#31343B"],
  },

  {
    title: "ظلال النخيل",
    description:
      "لوحة طبيعية عن تداخل الظلال مع ضوء الشمس بين أشجار النخيل، بألوان دافئة ومستوحاة من البيئة المصرية.",
    year: 2024,
    category: "مناظر طبيعية",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=85",
    colors: ["#46513D", "#728064", "#D8C7A8", "#8B7355"],
  },

  {
    title: "توازن",
    description:
      "تكوين هندسي يعتمد على التكرار والتناظر والمساحات الهادئة، مستوحى من الزخارف الإسلامية التقليدية.",
    year: 2026,
    category: "زخارف هندسية",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85",
    colors: ["#31343B", "#B76E4A", "#D8C7A8", "#46513D"],
  },

  {
    title: "ذاكرة القاهرة",
    description:
      "عمل مستوحى من العمارة القديمة في القاهرة وتفاصيل الأزقة والأبواب والنوافذ التي تحمل أثر الزمن.",
    year: 2025,
    category: "تراث مصري",
    image:
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=85",
    colors: ["#B76E4A", "#8B7355", "#D8C7A8", "#46513D"],
  },

  {
    title: "صفاء",
    description:
      "تكوين بسيط مستوحى من الطبيعة والماء والسماء، يعتمد على درجات لونية هادئة ومساحات واسعة.",
    year: 2024,
    category: "فن معاصر",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
    colors: ["#526B73", "#9EB1B5", "#D8D2C4", "#46513D"],
  },

  {
    title: "الخط الكوفي",
    description:
      "تجربة بصرية مستوحاة من الخط الكوفي وتكوينه الهندسي، مع إعادة تقديم الحروف بأسلوب عصري وبسيط.",
    year: 2026,
    category: "خط عربي",
    image:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1600&q=85",
    colors: ["#31343B", "#D8C7A8", "#B76E4A", "#F1E5CE"],
  },

  {
    title: "بيوت قديمة",
    description:
      "مشهد معماري هادئ يستحضر جمال البيوت التقليدية وتفاصيل النوافذ والأبواب والألوان الطبيعية.",
    year: 2023,
    category: "عمارة",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=85",
    colors: ["#B76E4A", "#D8C7A8", "#9A8065", "#46513D"],
  },

  {
    title: "رحلة الضوء",
    description:
      "عمل تجريدي مستوحى من حركة الضوء خلال اليوم، من درجات الصباح الهادئة إلى دفء الغروب.",
    year: 2025,
    category: "دراسة لونية",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=85",
    colors: ["#D8C7A8", "#B76E4A", "#E8DCC8", "#6B5548"],
  },
];

async function main() {
  console.log("🌿 Starting seed...");

  console.log("Creating artist profile...");

  await prisma.artistProfile.upsert({
    where: {
      id: ARTIST_PROFILE_ID,
    },
    update: artistProfile,
    create: artistProfile,
  });

  console.log("✓ Artist profile created");

  console.log("Removing old artworks...");

  await prisma.artwork.deleteMany();

  console.log("✓ Old artworks removed");

  console.log(`Creating ${artworks.length} artworks...`);

  await prisma.artwork.createMany({
    data: artworks,
  });

  console.log(`✓ Created ${artworks.length} artworks`);
  console.log("🌿 Seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });