// backend/models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an item name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Beverages', 'Desserts']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Food+Item'
  },
  available: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 15,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);