const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  originalPrice: Number,
  salePrice: Number,
  discountRate: Number,
  imageUrl: String,
  badges: [String],
  rating: Number,
  reviewCount: Number,
  watchingCount: Number,
  iconColors: [String]
});

module.exports = mongoose.model('Product', productSchema); 