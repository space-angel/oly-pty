const Product = require('../models/Product');
const Review = require('../models/Review');
const mongoose = require('mongoose');
require('dotenv').config();

const sampleProduct = {
  name: "프리미엄 후드 집업",
  brand: "나이키",
  originalPrice: 89000,
  salePrice: 71200,
  discountRate: 20,
  imageUrl: "https://example.com/hoodie.jpg",
  badges: ["무료배송", "당일발송"],
  rating: 4.5,
  reviewCount: 128,
  watchingCount: 45,
  iconColors: ["#FF0000", "#00FF00"],

  reviewSummary: {
    totalReviewCount: 128,
    averageRating: 4.5,
    scoreBars: [80, 30, 10, 5, 3],
    satisfaction: [
      {
        label: "사이즈",
        value: "정사이즈",
        percent: 85,
        details: [
          { label: "큰 편", percent: 10, highlight: false },
          { label: "정사이즈", percent: 85, highlight: true },
          { label: "작은 편", percent: 5, highlight: false }
        ]
      },
      {
        label: "색상",
        value: "선명해요",
        percent: 90,
        details: [
          { label: "선명해요", percent: 90, highlight: true },
          { label: "보통이에요", percent: 8, highlight: false },
          { label: "흐려요", percent: 2, highlight: false }
        ]
      },
      {
        label: "두께감",
        value: "적당해요",
        percent: 88,
        details: [
          { label: "두꺼워요", percent: 5, highlight: false },
          { label: "적당해요", percent: 88, highlight: true },
          { label: "얇아요", percent: 7, highlight: false }
        ]
      }
    ]
  },

  reviewSection: {
    reviewPhotos: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        alt: "후드 집업 착용 사진"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        alt: "상품 상세 사진"
      }
    ]
  }
};

const sampleReviews = [
  {
    userId: "user1",
    userName: "홍길동",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    content: "따뜻하고 편해요. 사이즈도 딱 맞고 배송도 빨라서 좋았어요!",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"],
    likes: 12,
    option: "블랙/L",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15")
  },
  {
    userId: "user2",
    userName: "김철수",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 4,
    content: "색상이 선명하고 퀄리티가 좋아요. 다만 사이즈가 조금 큰 감이 있네요.",
    images: ["https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"],
    likes: 8,
    option: "네이비/XL",
    createdAt: new Date("2024-03-14"),
    updatedAt: new Date("2024-03-14")
  },
  {
    userId: "user3",
    userName: "이영희",
    profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    content: "두 번째 구매입니다. 역시 믿고 사는 제품이에요!",
    likes: 5,
    option: "그레이/M",
    createdAt: new Date("2024-03-13"),
    updatedAt: new Date("2024-03-13")
  }
];

async function insertSampleData() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    await mongoose.connect(MONGODB_URI);
    
    console.log('MongoDB Atlas에 연결되었습니다.');
    
    // 기존 데이터 삭제
    await Product.deleteMany({});
    await Review.deleteMany({});
    
    // 새 상품 데이터 삽입
    const product = new Product(sampleProduct);
    const savedProduct = await product.save();
    
    // 리뷰에 productId 추가 후 삽입
    const reviewsWithProductId = sampleReviews.map(review => ({
      ...review,
      productId: savedProduct._id
    }));
    
    await Review.insertMany(reviewsWithProductId);
    
    console.log('샘플 데이터가 Atlas에 성공적으로 저장되었습니다.');
    process.exit(0);
  } catch (error) {
    console.error('데이터 저장 중 오류 발생:', error);
    process.exit(1);
  }
}

insertSampleData();