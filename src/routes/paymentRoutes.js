// src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const {
  processPayment,
  getPayment,
  getAllPayments,
  addToWallet
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../utils/constants');

router.use(protect);

router.post('/', processPayment);
router.post('/wallet/add', addToWallet);
router.get('/:id', getPayment);

router.get(
  '/',
  authorize(USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.CASHIER),
  getAllPayments
);

module.exports = router;