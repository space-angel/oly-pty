import { ReviewSectionData, Review } from '../types/reviewSection';
import { apiClient, handleApiError, ApiResponse } from './config';
import { AxiosError } from 'axios';

interface GetReviewsParams {
  productId: string;
  page?: number;
  limit?: number;
  sort?: string;
  keyword?: string;
  type?: string;
  tone?: string;
  issues?: string[];
  reviewType?: string;
  rating?: number;
}

class ReviewSectionApi {
  private static instance: ReviewSectionApi;

  private constructor() {}

  public static getInstance(): ReviewSectionApi {
    if (!ReviewSectionApi.instance) {
      ReviewSectionApi.instance = new ReviewSectionApi();
    }
    return ReviewSectionApi.instance;
  }

  async getReviews({
    productId,
    page = 1,
    limit = 10,
    sort = 'createdAt',
    keyword,
    type,
    tone,
    issues,
    reviewType,
    rating
  }: GetReviewsParams): Promise<{
    reviews: Review[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
        ...(keyword && { keyword }),
        ...(type && { type }),
        ...(tone && { tone }),
        ...(reviewType && { reviewType }),
        ...(rating !== undefined && rating !== null && { rating: rating.toString() }),
        ...(issues && issues.length > 0 && { issues: issues.join(',') }),
      });

      const response = await apiClient.get<ApiResponse<{
        reviews: Review[];
        total: number;
        page: number;
        totalPages: number;
      }>>(`/products/${productId}/reviews?${params}`);

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || '리뷰 목록을 가져오는데 실패했습니다.');
      }

      return response.data.data;
    } catch (error) {
      return handleApiError(error as AxiosError, '리뷰 목록 조회');
    }
  }

  async getKeywordCounts(productId: string): Promise<{
    all: number;
    usage: number;
    method: number;
    part: number;
    tip: number;
  }> {
    try {
      const response = await apiClient.get<ApiResponse<{
        all: number;
        usage: number;
        method: number;
        part: number;
        tip: number;
      }>>(`/products/${productId}/reviews/keyword-counts`);

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || '키워드별 리뷰 수를 가져오는데 실패했습니다.');
      }

      return response.data.data;
    } catch (error) {
      return handleApiError(error as AxiosError, '키워드별 리뷰 수 조회');
    }
  }

  async createReview(productId: string, review: Omit<Review, '_id' | 'createdAt' | 'updatedAt'>): Promise<Review> {
    try {
      const response = await apiClient.post<ApiResponse<Review>>(`/products/${productId}/reviews`, review);
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || '리뷰 작성에 실패했습니다.');
      }

      return response.data.data;
    } catch (error) {
      return handleApiError(error as AxiosError, '리뷰 작성');
    }
  }

  async updateReview(reviewId: string, review: Partial<Review>): Promise<Review> {
    try {
      const response = await apiClient.put<ApiResponse<Review>>(`/reviews/${reviewId}`, review);
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || '리뷰 수정에 실패했습니다.');
      }

      return response.data.data;
    } catch (error) {
      return handleApiError(error as AxiosError, '리뷰 수정');
    }
  }

  async deleteReview(reviewId: string): Promise<void> {
    try {
      const response = await apiClient.delete<ApiResponse<void>>(`/reviews/${reviewId}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || '리뷰 삭제에 실패했습니다.');
      }
    } catch (error) {
      return handleApiError(error as AxiosError, '리뷰 삭제');
    }
  }
}

export const reviewSectionApi = ReviewSectionApi.getInstance(); 