export interface Product {
  id: number;
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
}

export interface ProductApiResponse {
  data: Product;
  success: boolean;
  message?: string;
} 