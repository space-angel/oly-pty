import { ReviewSummaryData, ReviewSummaryApiResponse } from '../types/reviewSummary';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// 임시 더미 데이터 (실제 API 연동 전까지 사용)
const dummyReviewSummary: ReviewSummaryData = {
  totalReviewCount: 6891,
  averageRating: 4.7,
  scoreBars: [80, 80, 80, 80, 80], // 5점~1점 순서
  satisfaction: [
    { 
      label: "발색력", 
      value: "아주 만족해요", 
      percent: 72 
    },
    { 
      label: "지속력", 
      value: "보통이에요", 
      percent: 48 
    },
    { 
      label: "발림성", 
      value: "꼼꼼해요", 
      percent: 74 
    },
  ],
  satisfactionDetails: [
    [
      { label: '아주 만족해요', percent: 72, highlight: true },
      { label: '보통이에요', percent: 22 },
      { label: '다소 아쉬워요', percent: 6 },
    ],
    [
      { label: '지속이 오래돼요', percent: 38 },
      { label: '보통이에요', percent: 48, highlight: true },
      { label: '예상보다 짧아요', percent: 14 },
    ],
    [
      { label: '꼼꼼해요', percent: 74, highlight: true },
      { label: '보통이에요', percent: 23 },
      { label: '다소 아쉬워요', percent: 3 },
    ],
  ]
};

export const getReviewSummary = async (productId: number): Promise<ReviewSummaryData> => {
  try {
    // API 연동 전까지 더미 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyReviewSummary);
      }, 300);
    });
  } catch (error) {
    console.error('리뷰 요약 정보 조회 실패:', error);
    throw error;
  }
}; 