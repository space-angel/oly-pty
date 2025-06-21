const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const { sendSuccess, sendError } = require('../utils/responseHelper');

// 상품의 리뷰 목록 조회 (페이지네이션)
router.get('/products/:productId/reviews', async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = '-createdAt', keyword } = req.query;

    // 정렬 필드 매핑
    const sortMapping = {
      'createdAt': '-createdAt',
      'likes': '-likes',
      'rating': '-rating'
    };

    // 검색 조건 설정
    const query = { productId };
    if (keyword && keyword !== 'all') {
      query.content = { $regex: keyword, $options: 'i' };
    }

    const reviews = await Review.find(query)
      .sort(sortMapping[sort] || sort)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    const total = await Review.countDocuments(query);

    sendSuccess(res, {
      reviews,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error('리뷰 목록 조회 실패:', error);
    sendError(res, '리뷰 목록을 불러오는데 실패했습니다.');
  }
});

// 리뷰 작성
router.post('/products/:productId/reviews', async (req, res) => {
  try {
    const { productId } = req.params;
    const reviewData = { ...req.body, productId };

    const review = await Review.create(reviewData);

    // 상품의 리뷰 통계 업데이트
    await updateProductReviewStats(productId);

    sendSuccess(res, review);
  } catch (error) {
    console.error('리뷰 작성 실패:', error);
    sendError(res, '리뷰 작성에 실패했습니다.');
  }
});

// 리뷰 수정
router.put('/reviews/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { $set: req.body },
      { new: true }
    );

    if (!review) {
      return sendError(res, '리뷰를 찾을 수 없습니다.', 404);
    }

    // 상품의 리뷰 통계 업데이트
    await updateProductReviewStats(review.productId);

    sendSuccess(res, review);
  } catch (error) {
    console.error('리뷰 수정 실패:', error);
    sendError(res, '리뷰 수정에 실패했습니다.');
  }
});

// 리뷰 삭제
router.delete('/reviews/:reviewId', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    
    if (!review) {
      return sendError(res, '리뷰를 찾을 수 없습니다.', 404);
    }

    // 상품의 리뷰 통계 업데이트
    await updateProductReviewStats(review.productId);

    sendSuccess(res, { message: '리뷰가 삭제되었습니다.' });
  } catch (error) {
    console.error('리뷰 삭제 실패:', error);
    sendError(res, '리뷰 삭제에 실패했습니다.');
  }
});

// 상품의 리뷰 통계 업데이트 헬퍼 함수
async function updateProductReviewStats(productId) {
  const reviews = await Review.find({ productId });
  
  // 기본 통계 계산
  const totalReviewCount = reviews.length;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviewCount || 0;
  
  // 평점 분포 계산
  const scoreBars = Array(5).fill(0);
  reviews.forEach(review => {
    scoreBars[5 - review.rating]++;
  });

  // 상품 업데이트
  await Product.findByIdAndUpdate(productId, {
    $set: {
      rating: averageRating,
      reviewCount: totalReviewCount,
      'reviewSummary.totalReviewCount': totalReviewCount,
      'reviewSummary.averageRating': averageRating,
      'reviewSummary.scoreBars': scoreBars
    }
  });
}

module.exports = router; 