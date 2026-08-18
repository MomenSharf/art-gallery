export interface Artwork {
  id: string;
  title: string;
  description: string;
  year: number;
  category: string;
  image: string;
  colors: string[];
  createdAt?: string;
  updatedAt?: string;
}