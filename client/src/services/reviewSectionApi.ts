import { ReviewSectionData, ReviewSectionApiResponse } from '../types/reviewSection';

// const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// 임시 더미 데이터 (실제 API 연동 전까지 사용)
const dummyReviewSection: ReviewSectionData = {
  reviews: [
    {
      id: 1,
      user: "홍길동",
      rating: 5,
      content: "좋아요!",
      date: "2024-06-13",
      likeCount: 3,
    },
    {
      id: 2,
      user: "김영희",
      rating: 4,
      content: "핸드크림이 같이 증정되는 리뷰 줄바꿈 확인 기획이라서 더 좋은 것 같아요 잘 샀어요",
      date: "2024-06-12",
      likeCount: 1,
      reviewImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      user: "이철수",
      rating: 3,
      content: "향은 딱 복숭아🍑 그냥 복숭아 보단.. 상큼함이 좀 더 들어간 천도복숭아? 상큼 70% 달달 30% 정도?머스크 향은 일절 없이 상큼 달달한 복숭아 향이여서 여름맞이 가벼운 향수 찾으신다면 추천드려요ㅎㅎ",
      date: "2024-06-11",
      likeCount: 0,
      reviewImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
    },
  ],
  reviewPhotos: [
    { id: 1, url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    { id: 2, url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    { id: 3, url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    { id: 4, url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    { id: 5, url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    { id: 6, url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
    { id: 7, url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  ],
  keywords: [
    { id: "all", label: "전체", active: true },
    { id: "usage", label: "#사용감" },
    { id: "method", label: "#사용방법" },
    { id: "part", label: "#사용부위" },
    { id: "tip", label: "#사용팁" },
  ],
  sortOptions: [
    { label: "유용한순", active: true, info: true },
    { label: "도움순" },
    { label: "최신순" },
  ]
};

export const getReviewSection = async (productId: number): Promise<ReviewSectionData> => {
  try {
    // API 연동 전까지 더미 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyReviewSection);
      }, 400);
    });
  } catch (error) {
    console.error('리뷰 섹션 정보 조회 실패:', error);
    return dummyReviewSection;
  }
}; 