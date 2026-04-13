const mongoose = require('mongoose')

const watchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Watch name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['luxury', 'sport', 'classic', 'smart', 'diving', 'dress']
  },
  images: [{
    type: String,
    required: true
  }],
  features: [{
    type: String
  }],
  specifications: {
    movement: String,
    caseMaterial: String,
    caseDiameter: String,
    waterResistance: String,
    strapMaterial: String,
    warranty: String
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Index for search
watchSchema.index({ name: 'text', brand: 'text', description: 'text' })

// Virtual for discount percentage
watchSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100)
  }
  return 0
})

// Ensure virtual fields are serialized
watchSchema.set('toJSON', { virtuals: true })
watchSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('Watch', watchSchema)