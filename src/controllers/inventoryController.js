// src/controllers/inventoryController.js
const Inventory = require('../models/Inventory');

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Private (Admin/Manager)
exports.getAllInventory = async (req, res, next) => {
  try {
    const { category, lowStock } = req.query;

    let query = {};

    if (category) query.category = category;

    const inventory = await Inventory.find(query).sort({ createdAt: -1 });

    // Filter low stock items if requested
    let filteredInventory = inventory;
    if (lowStock === 'true') {
      filteredInventory = inventory.filter(item => item.isLowStock);
    }

    res.status(200).json({
      success: true,
      count: filteredInventory.length,
      data: filteredInventory
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single inventory item
// @route   GET /api/inventory/:id
// @access  Private (Admin/Manager)
exports.getInventoryItem = async (req, res, next) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add inventory item
// @route   POST /api/inventory
// @access  Private (Admin/Manager)
exports.addInventoryItem = async (req, res, next) => {
  try {
    const item = await Inventory.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Inventory item added successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inventory item
// @route   PUT /api/inventory/:id
// @access  Private (Admin/Manager)
exports.updateInventoryItem = async (req, res, next) => {
  try {
    let item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Inventory item updated successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
// @access  Private (Admin/Manager)
exports.deleteInventoryItem = async (req, res, next) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Inventory item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Restock inventory item
// @route   PATCH /api/inventory/:id/restock
// @access  Private (Admin/Manager)
exports.restockItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid quantity'
      });
    }

    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    item.quantity += quantity;
    item.lastRestocked = Date.now();
    await item.save();

    res.status(200).json({
      success: true,
      message: 'Inventory restocked successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get low stock alerts
// @route   GET /api/inventory/alerts/low-stock
// @access  Private (Admin/Manager)
exports.getLowStockAlerts = async (req, res, next) => {
  try {
    const inventory = await Inventory.find();
    const lowStockItems = inventory.filter(item => item.isLowStock);

    res.status(200).json({
      success: true,
      count: lowStockItems.length,
      data: lowStockItems
    });
  } catch (error) {
    next(error);
  }
};