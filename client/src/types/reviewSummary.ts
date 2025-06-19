export interface SatisfactionDetail {
  label: string;
  percent: number;
  highlight?: boolean;
}

export interface SatisfactionItem {
  label: string;
  value: string;
  percent: number;
  details?: SatisfactionDetail[];
}

export interface ReviewSummaryData {
  totalReviewCount: number;
  averageRating: number;
  scoreBars: number[]; // 별점별 분포 (5점~1점)
  satisfaction: SatisfactionItem[];
  satisfactionDetails: SatisfactionDetail[][];
}

export interface ReviewSummaryApiResponse {
  data: ReviewSummaryData;
  success: boolean;
  message?: string;
} 