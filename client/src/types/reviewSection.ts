export interface Review {
  id: number;
  user: string;
  profileImage?: string;
  badge?: string;
  badgeColor?: string;
  date: string;
  rating: number;
  option?: string;
  summary?: string;
  content: string;
  likeCount: number;
  reviewImage?: string;
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

export interface ReviewSectionApiResponse {
  data: ReviewSectionData;
  success: boolean;
  message?: string;
} 