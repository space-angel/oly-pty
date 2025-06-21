const mongoose = require('mongoose');

const satisfactionDetailSchema = new mongoose.Schema({
  label: String,
  percent: Number,
  highlight: Boolean
});

const satisfactionSchema = new mongoose.Schema({
  label: String,
  value: String,
  percent: Number,
  details: [satisfactionDetailSchema]
});

const keywordSchema = new mongoose.Schema({
  id: String,
  label: String,
  active: Boolean
});

const sortOptionSchema = new mongoose.Schema({
  label: String,
  active: Boolean,
  info: Boolean
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  brand: {
    type: String,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  salePrice: {
    type: Number,
    required: true,
    min: 0
  },
  discountRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  imageUrl: {
    type: String,
    required: true
  },
  badges: [String],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  watchingCount: {
    type: Number,
    default: 0
  },
  iconColors: [String],

  // 리뷰 요약 정보
  reviewSummary: {
    totalReviewCount: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    scoreBars: {
      type: [Number],
      default: [0, 0, 0, 0, 0]
    },
    satisfaction: [satisfactionSchema]
  },

  // 리뷰 섹션 설정 정보 (실제 리뷰 데이터는 Review 컬렉션으로 이동)
  reviewSection: {
    keywords: [keywordSchema],
    sortOptions: [sortOptionSchema]
  }
}, {
  timestamps: true
});

// 가상 필드: id (클라이언트와의 호환성을 위해 유지)
productSchema.virtual('id').get(function() {
  return this._id;
});

// JSON 변환 시 가상 필드 포함
productSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Product', productSchema); 