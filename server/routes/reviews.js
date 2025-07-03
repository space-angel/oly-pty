const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const { sendSuccess, sendError } = require('../utils/responseHelper');

// 상품의 리뷰 목록 조회 (페이지네이션)
router.get('/products/:productId/reviews', async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = '-createdAt', keyword, rating, type, tone, reviewType, issues } = req.query;

    // 정렬 필드 매핑
    const sortMapping = {
      'createdAt': '-createdAt',
      'likes': '-likes',
      'rating': '-rating'
    };

    // 검색 조건 설정
    const query = { productId };
    if (keyword && keyword !== 'all') {
      // 키워드별 검색 조건 매핑
      const keywordMapping = {
        'usage': /(사용감|제형|발림성|발리기|바르기|발라|바른|발라서|바르고|바르면|바르니|바르는데|바르는|바르며)/i,
        'method': /(사용방법|바르는법|발라|바르기|바른|발라서|바르고|바르면|바르니|바르는데|바르는|바르며|사용법|적용법|도포법)/i,
        'part': /(사용부위|부위|얼굴|이마|볼|코|턱|관자놀이|T존|U존|윗입술|아랫입술|눈가|눈밑|눈위|눈옆|눈앞|눈뒤|눈앞|눈뒤|눈가|눈밑|눈위|눈옆|눈앞|눈뒤)/i,
        'tip': /(사용팁|팁|꿀팁|노하우|조언|추천|추천법|사용법|적용법|도포법|바르는법|발라|바르기|바른|발라서|바르고|바르면|바르니|바르는데|바르는|바르며)/i
      };
      
      if (keywordMapping[keyword]) {
        query.content = keywordMapping[keyword];
      } else {
        // 기본 검색 (기존 로직)
        query.content = { $regex: keyword, $options: 'i' };
      }
    }

    // 맞춤 필터 파라미터 처리
    if (rating) query.rating = Number(rating);
    if (type) query.skinType = type;
    if (tone) query.skinTone = tone;
    if (reviewType) query.reviewType = reviewType;
    if (issues) {
      const issuesArr = Array.isArray(issues) ? issues : issues.split(',');
      query.skinConcerns = { $in: issuesArr };
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

// 키워드별 리뷰 수 조회
router.get('/products/:productId/reviews/keyword-counts', async (req, res) => {
  try {
    const { productId } = req.params;

    // 키워드별 검색 패턴
    const keywordPatterns = {
      'usage': /(사용감|제형|발림성|발리기|바르기|발라|바른|발라서|바르고|바르면|바르니|바르는데|바르는|바르며)/i,
      'method': /(사용방법|바르는법|발라|바르기|바른|발라서|바르고|바르면|바르니|바르는데|바르는|바르며|사용법|적용법|도포법)/i,
      'part': /(사용부위|부위|얼굴|이마|볼|코|턱|관자놀이|T존|U존|윗입술|아랫입술|눈가|눈밑|눈위|눈옆|눈앞|눈뒤)/i,
      'tip': /(사용팁|팁|꿀팁|노하우|조언|추천|추천법|사용법|적용법|도포법|바르는법|발라|바르기|바른|발라서|바르고|바르면|바르니|바르는데|바르는|바르며)/i
    };

    const allReviews = await Review.find({ productId });
    const totalCount = allReviews.length;

    const keywordCounts = {
      all: totalCount,
      usage: 0,
      method: 0,
      part: 0,
      tip: 0
    };

    // 각 키워드별 리뷰 수 계산
    allReviews.forEach(review => {
      Object.keys(keywordPatterns).forEach(keyword => {
        if (keywordPatterns[keyword].test(review.content)) {
          keywordCounts[keyword]++;
        }
      });
    });

    sendSuccess(res, keywordCounts);
  } catch (error) {
    console.error('키워드별 리뷰 수 조회 실패:', error);
    sendError(res, '키워드별 리뷰 수를 불러오는데 실패했습니다.');
  }
});

module.exports = router; 