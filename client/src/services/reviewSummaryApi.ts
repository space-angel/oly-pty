import { ReviewSummaryData } from '../types/reviewSummary';
import { apiClient, handleApiError, ApiResponse } from './config';
import { AxiosError } from 'axios';

class ReviewSummaryApi {
  private static instance: ReviewSummaryApi;
  private readonly BASE_PATH = '/review-summary';

  // 개발용 더미 데이터
  private readonly dummyData: ReviewSummaryData = {
    totalReviewCount: 405,
    averageRating: 4.6,
    scoreBars: [80, 15, 3, 1, 1],
    satisfaction: [
      {
        label: '효과',
        value: '4.5',
        percent: 90,
        details: [
          { label: '매우 좋음', percent: 90, highlight: true },
          { label: '좋음', percent: 8, highlight: false },
          { label: '보통', percent: 2, highlight: false }
        ]
      },
      {
        label: '흡수력',
        value: '4.3',
        percent: 86,
        details: [
          { label: '매우 좋음', percent: 86, highlight: true },
          { label: '좋음', percent: 10, highlight: false },
          { label: '보통', percent: 4, highlight: false }
        ]
      },
      {
        label: '보습력',
        value: '4.4',
        percent: 88,
        details: [
          { label: '매우 좋음', percent: 88, highlight: true },
          { label: '좋음', percent: 9, highlight: false },
          { label: '보통', percent: 3, highlight: false }
        ]
      },
      {
        label: '향',
        value: '4.2',
        percent: 84,
        details: [
          { label: '매우 좋음', percent: 84, highlight: true },
          { label: '좋음', percent: 12, highlight: false },
          { label: '보통', percent: 4, highlight: false }
        ]
      }
    ]
  };

  private constructor() {}

  public static getInstance(): ReviewSummaryApi {
    if (!ReviewSummaryApi.instance) {
      ReviewSummaryApi.instance = new ReviewSummaryApi();
    }
    return ReviewSummaryApi.instance;
  }

  async getReviewSummary(productId: string): Promise<ReviewSummaryData> {
    try {
      // 개발 환경에서는 더미 데이터 반환
      if (process.env.NODE_ENV === 'development') {
        return this.dummyData;
      }
      
      const response = await apiClient.get<ApiResponse<ReviewSummaryData>>(`${this.BASE_PATH}/${productId}`);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || '리뷰 요약 정보를 가져오는데 실패했습니다.');
      }
      return response.data.data;
    } catch (error) {
      return handleApiError(error as AxiosError, '리뷰 요약 정보 조회');
    }
  }
}

export const reviewSummaryApi = ReviewSummaryApi.getInstance(); 