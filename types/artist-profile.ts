export interface ArtistProfile {
  id: string;

  name: string;
  bio: string | null;
  avatar: string | null;
  location: string | null;

  email: string | null;
  phone: string | null;

  artStyle: string | null;
  specialty: string | null;
  availableForWork: boolean;

  website: string | null;
  instagram: string | null;
  facebook: string | null;
  x: string | null;
  behance: string | null;
  dribbble: string | null;

  createdAt: Date;
  updatedAt: Date;
}