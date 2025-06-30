export interface Review {
  _id: string;
  productId: string;
  userId: string;
  userName: string;
  profileImage?: string;
  rating: number;
  content: string;
  images?: string[];
  likes: number;
  option?: string;
  createdAt: string;
  updatedAt: string;
  skinType?: string;
  skinTone?: string;
  skinConcerns?: string[];
  keywords?: string[];
}

export interface ReviewPhoto {
  id: number;
  url: string;
  alt?: string;
}

export interface SortOption {
  label: string;
  active?: boolean;
  info?: boolean;
}

export interface Keyword {
  id: string;
  label: string;
  active?: boolean;
}

export interface ReviewSectionData {
  reviews: Review[];
  reviewPhotos: ReviewPhoto[];
  keywords: Keyword[];
  sortOptions: SortOption[];
} 