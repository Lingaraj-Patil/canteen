// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../utils/constants');

router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrder);
router.patch('/:id/cancel', cancelOrder);

router.get(
  '/',
  authorize(USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.CASHIER, USER_ROLES.KITCHEN),
  getAllOrders
);

router.patch(
  '/:id/status',
  authorize(USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.CASHIER, USER_ROLES.KITCHEN),
  updateOrderStatus
);

module.exports = router;