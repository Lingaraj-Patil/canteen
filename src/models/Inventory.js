// src/models/Inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, 'Please provide item name'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['raw_material', 'packaging', 'consumables', 'equipment']
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: 0
  },
  unit: {
    type: String,
    required: [true, 'Please provide unit'],
    enum: ['kg', 'g', 'l', 'ml', 'pieces', 'packets']
  },
  minStockLevel: {
    type: Number,
    required: [true, 'Please provide minimum stock level'],
    min: 0
  },
  supplier: {
    name: String,
    contact: String,
    email: String
  },
  costPerUnit: {
    type: Number,
    required: [true, 'Please provide cost per unit'],
    min: 0
  },
  lastRestocked: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  location: {
    type: String,
    default: 'Main Storage'
  }
}, {
  timestamps: true
});

// Check if stock is low
inventorySchema.virtual('isLowStock').get(function() {
  return this.quantity <= this.minStockLevel;
});

// Check if expired
inventorySchema.virtual('isExpired').get(function() {
  if (this.expiryDate) {
    return new Date() > this.expiryDate;
  }
  return false;
});

inventorySchema.set('toJSON', { virtuals: true });

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;