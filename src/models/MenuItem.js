// src/models/MenuItem.js
const mongoose = require('mongoose');
const { ITEM_CATEGORIES } = require('../utils/constants');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide item name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide item description']
  },
  category: {
    type: String,
    enum: Object.values(ITEM_CATEGORIES),
    required: [true, 'Please provide item category']
  },
  price: {
    type: Number,
    required: [true, 'Please provide item price'],
    min: 0
  },
  image: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 15,
    comment: 'Time in minutes'
  },
  ingredients: [{
    type: String
  }],
  isVegetarian: {
    type: Boolean,
    default: true
  },
  calories: {
    type: Number
  },
  discount: {
    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    validUntil: {
      type: Date
    }
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Calculate final price with discount
menuItemSchema.virtual('finalPrice').get(function() {
  if (this.discount.percentage > 0 && 
      this.discount.validUntil && 
      new Date() < this.discount.validUntil) {
    return this.price * (1 - this.discount.percentage / 100);
  }
  return this.price;
});

menuItemSchema.set('toJSON', { virtuals: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;