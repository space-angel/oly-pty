export interface SatisfactionDetail {
  label: string;
  percent: number;
  highlight: boolean;
}

export interface Satisfaction {
  label: string;
  value: string;
  percent: number;
  details: SatisfactionDetail[];
}

export interface ReviewSummaryData {
  totalReviewCount: number;
  averageRating: number;
  scoreBars: number[];
  satisfaction: Satisfaction[];
} 