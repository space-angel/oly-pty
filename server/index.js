const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];

// CORS 설정
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// 미들웨어 설정
app.use(express.json());

// 응답 헬퍼 함수
const sendSuccess = (res, data) => {
  res.json({
    success: true,
    data: data,
    message: null
  });
};

const sendError = (res, status, message) => {
  res.status(status).json({
    success: false,
    data: null,
    message: message
  });
};

// 몽고DB 연결
let dbConnected = false;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB 연결 성공');
    dbConnected = true;
  })
  .catch(err => {
    console.error('❌ MongoDB 연결 실패:', err);
    dbConnected = false;
  });

// 모델 import
const Product = require('./models/Product');
const Review = require('./models/Review');

// 라우트 import
const reviewRoutes = require('./routes/reviews');

// API 상태 체크 미들웨어
app.use((req, res, next) => {
  if (!dbConnected && req.path !== '/api/status') {
    return sendError(res, 503, 'Database connection is not available');
  }
  next();
});

// API 상태 확인 라우트
app.get('/api/status', (req, res) => {
  sendSuccess(res, {
    server: 'running',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// 라우트 설정
app.use('/api', reviewRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  sendSuccess(res, { 
    message: '안녕하세요! ol-pty API 서버입니다! 🚀',
    status: 'running'
  });
});

// 더미 상품 데이터 삽입 API
app.post('/api/products/dummy', async (req, res) => {
  try {
    const dummyProduct = {
      name: "[6월 올영픽/NEW] 클리오 킬 커버 메쉬 블러 쿠션 (+파우더 팩트 증정)",
      brand: "클리오",
      originalPrice: 36000,
      salePrice: 27000,
      discountRate: 25,
      imageUrl: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/10/0000/0022/A00000022721303ko.jpg?qt=80",
      badges: ["오늘드림", "BEST"],
      rating: 4.6,
      reviewCount: 405,
      watchingCount: 141,
      iconColors: ['#e5cfc7', '#e5d7d0'],

      reviewSummary: {
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

    const product = await Product.create(dummyProduct);
    console.log('✅ 더미 상품 데이터 삽입 완료:', product);

    // 더미 리뷰 데이터 생성
    const dummyReviews = [
      {
        productId: product._id,
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
        productId: product._id,
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
        productId: product._id,
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

    await Review.insertMany(dummyReviews);
    console.log('✅ 더미 리뷰 데이터 삽입 완료');

    sendSuccess(res, product);
  } catch (error) {
    console.error('❌ 더미 데이터 삽입 실패:', error);
    sendError(res, 500, '더미 데이터 삽입 실패');
  }
});

// 상품 전체 조회 API
app.get('/api/products', async (req, res) => {
  try {
    console.log('📦 상품 목록 조회 요청 받음');
    const products = await Product.find();
    console.log(`✅ ${products.length}개의 상품 조회 완료`);
    sendSuccess(res, products);
  } catch (error) {
    console.error('❌ 상품 목록 조회 실패:', error);
    sendError(res, 500, '상품 목록 조회 실패');
  }
});

// 상품 상세 조회 API
app.get('/api/products/:id', async (req, res) => {
  try {
    console.log(`📦 상품 상세 조회 요청 받음 (ID: ${req.params.id})`);
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log('❌ 상품을 찾을 수 없음');
      return sendError(res, 404, '상품을 찾을 수 없습니다.');
    }
    console.log('✅ 상품 상세 조회 완료:', product);
    sendSuccess(res, product);
  } catch (error) {
    console.error('❌ 상품 상세 조회 실패:', error);
    sendError(res, 500, '서버 오류가 발생했습니다.');
  }
});

// 서버 시작
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🎉 서버가 ${PORT}번 포트에서 실행 중입니다!`);
  console.log(`📱 API 주소: http://localhost:${PORT}`);
});