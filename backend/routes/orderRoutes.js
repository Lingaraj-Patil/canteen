// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.get('/user', protect, getUserOrders);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, admin, updateOrderStatus);

module.exports = router;