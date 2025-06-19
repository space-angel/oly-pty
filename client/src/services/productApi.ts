import { Product, ProductApiResponse } from '../types/product';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// 임시 더미 데이터 (실제 API 연동 전까지 사용)
const dummyProduct: Product = {
  id: 1,
  name: "[6월 올영픽/NEW] 클리오 킬 커버 메쉬 블러 쿠션 (+파우더 팩트 증정)",
  brand: "테스트",
  originalPrice: 36000,
  salePrice: 27000,
  discountRate: 25,
  imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/10/0000/0022/A00000022721303ko.jpg?qt=80",
  badges: ["오늘드림", "BEST"],
  rating: 4.6,
  reviewCount: 405,
  watchingCount: 141,
  iconColors: ['#e5cfc7', '#e5d7d0']
};

export const getProduct = async (productId: number): Promise<Product> => {
  try {
    // API 연동 전까지 더미 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyProduct);
      }, 500);
    });
  } catch (error) {
    console.error('상품 정보 조회 실패:', error);
    throw error;
  }
}; 