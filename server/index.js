const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { sendSuccess, sendError } = require('./utils/responseHelper');
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews');

const app = express();

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// CORS 설정 (모든 출처 허용)
app.use(cors());

// 미들웨어 설정
app.use(express.json());

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

// API 상태 체크 미들웨어
app.use((req, res, next) => {
  if (!dbConnected && req.path !== '/api/status') {
    return sendError(res, 'Database connection is not available', 503);
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
app.use('/api', productRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  sendSuccess(res, { 
    message: '안녕하세요! ol-pty API 서버입니다! 🚀',
    status: 'running'
  });
});

// 서버 시작
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🎉 서버가 ${PORT}번 포트에서 실행 중입니다!`);
  console.log(`📱 API 주소: http://localhost:${PORT}`);
});