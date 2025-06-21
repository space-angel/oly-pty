import { ReviewSummaryData } from './reviewSummary';
import { ReviewPhoto } from './reviewSection';

export interface Product {
  _id: string;
  name: string;
  brand: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
  imageUrl: string;
  badges: string[];
  rating: number;
  reviewCount: number;
  watchingCount: number;
  iconColors: string[];
  reviewSummary: ReviewSummaryData;
  reviewSection?: {
    reviewPhotos: ReviewPhoto[];
  };
}

export interface ProductApiResponse {
  data: Product;
  success: boolean;
  message?: string;
} 