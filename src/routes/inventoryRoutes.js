// src/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllInventory,
  getInventoryItem,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  restockItem,
  getLowStockAlerts
} = require('../controllers/inventoryController');
const { protect, isAdminOrManager } = require('../middleware/authMiddleware');

router.use(protect);
router.use(isAdminOrManager);

router.get('/', getAllInventory);
router.get('/alerts/low-stock', getLowStockAlerts);
router.get('/:id', getInventoryItem);
router.post('/', addInventoryItem);
router.put('/:id', updateInventoryItem);
router.delete('/:id', deleteInventoryItem);
router.patch('/:id/restock', restockItem);

module.exports = router;