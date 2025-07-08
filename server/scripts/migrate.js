const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const Review = require('../models/Review');

// 데이터 파일 경로
const productsPath = path.join(__dirname, '../data/products.json');
const reviewsPath = path.join(__dirname, '../data/reviews.json');

// 데이터 로드
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf-8'));

const importData = async () => {
  try {
    await connectDB();

    // 기존 데이터 삭제
    await Product.deleteMany();
    await Review.deleteMany();
    console.log('기존 데이터 삭제 완료');

    // 상품 데이터 삽입
    const createdProducts = await Product.insertMany(products);
    console.log('상품 데이터 삽입 완료');

    // productName을 productId로 매핑
    const productMap = createdProducts.reduce((map, product) => {
      map[product.name] = product._id;
      return map;
    }, {});

    const reviewsWithProductId = reviews.map(review => {
      const { productName, reviewImages, ...restOfReview } = review;
      const productId = productMap[productName];
      if (!productId) {
        console.warn(`매핑 실패: productName='${productName}'`);
      }
      return {
        ...restOfReview,
        images: reviewImages,
        productId: productId,
      };
    }).filter(review => review.productId); // productId가 없는 리뷰는 제외

    // 리뷰 데이터 삽입
    if (reviewsWithProductId.length > 0) {
      await Review.insertMany(reviewsWithProductId);
      console.log('리뷰 데이터 삽입 완료');
    }

    console.log('데이터 마이그레이션 성공!');
    process.exit();
  } catch (error) {
    console.error(`마이그레이션 오류: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Review.deleteMany();

    console.log('데이터 삭제 완료!');
    process.exit();
  } catch (error) {
    console.error(`데이터 삭제 오류: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
