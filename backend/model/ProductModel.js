const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  condition: {
    type: String,
    enum: ['new', 'like-new', 'excellent', 'good', 'fair', 'poor'],
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  // Dynamic attributes based on category
  attributes: {
    type: Schema.Types.Mixed,
    default: {}
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'archived'],
    default: 'active'
  },
  location: {
    country: String,
    city: String
  }
}, {
  timestamps: true
});



module.exports = mongoose.model('Product', ProductSchema);
