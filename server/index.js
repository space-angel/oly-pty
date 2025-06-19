const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 몽고DB 연결
mongoose.connect(process.env.MONGODB_URI);

// Product 모델 import
const Product = require('./models/Product');

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ 
    message: '안녕하세요! ol-pty API 서버입니다! 🚀',
    status: 'running'
  });
});

// 더미 상품 데이터 삽입 API
app.post('/api/products/dummy', async (req, res) => {
  const dummyProduct = {
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
  await Product.create(dummyProduct);
  res.send('더미 상품 데이터 삽입 완료!');
});

// 상품 전체 조회 API
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 서버 시작
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🎉 서버가 ${PORT}번 포트에서 실행 중입니다!`);
  console.log(`📱 API 주소: http://localhost:${PORT}`);
});