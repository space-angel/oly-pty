const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: "https://randomuser.me/api/portraits/lego/1.jpg"
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  images: {
    type: [String],
    default: []
  },
  likes: {
    type: Number,
    default: 0
  },
  option: String
}, {
  timestamps: true
});

// JSON 변환 시 가상 필드 포함
reviewSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Review', reviewSchema); 