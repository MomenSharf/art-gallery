-- CreateTable
CREATE TABLE "ArtistProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "location" TEXT,
    "avatar" TEXT,
    "website" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "x" TEXT,
    "behance" TEXT,
    "dribbble" TEXT,
    "artStyle" TEXT,
    "specialty" TEXT,
    "availableForWork" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArtistProfile_pkey" PRIMARY KEY ("id")
);
