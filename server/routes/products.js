const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { sendSuccess, sendError } = require('../utils/responseHelper');

// 상품 전체 조회 API
router.get('/products', async (req, res) => {
  try {
    console.log('📦 상품 목록 조회 요청 받음');
    const products = await Product.find();
    console.log(`✅ ${products.length}개의 상품 조회 완료`);
    sendSuccess(res, products);
  } catch (error) {
    console.error('❌ 상품 목록 조회 실패:', error);
    sendError(res, '상품 목록 조회에 실패했습니다.');
  }
});

// 상품 상세 조회 API
router.get('/products/:id', async (req, res) => {
  try {
    console.log(`📦 상품 상세 조회 요청 받음 (ID: ${req.params.id})`);
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log('❌ 상품을 찾을 수 없음');
      return sendError(res, '상품을 찾을 수 없습니다.', 404);
    }
    console.log('✅ 상품 상세 조회 완료:', product);
    sendSuccess(res, product);
  } catch (error) {
    console.error('❌ 상품 상세 조회 실패:', error);
    sendError(res, '서버 오류가 발생했습니다.');
  }
});

module.exports = router; 