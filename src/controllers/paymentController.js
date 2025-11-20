// src/controllers/paymentController.js
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const User = require('../models/User');
const { PAYMENT_STATUS } = require('../utils/constants');

// @desc    Process payment
// @route   POST /api/payments
// @access  Private
exports.processPayment = async (req, res, next) => {
  try {
    const { orderId, paymentMethod, transactionId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to pay for this order'
      });
    }

    if (order.paymentStatus === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Order is already paid'
      });
    }

    // Handle wallet payment
    if (paymentMethod === 'wallet') {
      const user = await User.findById(req.user.id);

      if (user.walletBalance < order.finalAmount) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient wallet balance'
        });
      }

      user.walletBalance -= order.finalAmount;
      await user.save();
    }

    // Create payment record
    const payment = await Payment.create({
      order: orderId,
      customer: req.user.id,
      amount: order.finalAmount,
      paymentMethod,
      status: PAYMENT_STATUS.COMPLETED,
      transactionId,
      paidAt: Date.now()
    });

    // Update order payment status
    order.paymentStatus = 'completed';
    order.status = 'confirmed';
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully',
      data: payment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment details
// @route   GET /api/payments/:id
// @access  Private
exports.getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('order')
      .populate('customer', 'name email');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private (Admin/Manager/Cashier)
exports.getAllPayments = async (req, res, next) => {
  try {
    const { status, paymentMethod, startDate, endDate } = req.query;

    let query = {};

    if (status) query.status = status;
    if (paymentMethod) query.paymentMethod = paymentMethod;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const payments = await Payment.find(query)
      .populate('order', 'orderNumber finalAmount')
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add money to wallet
// @route   POST /api/payments/wallet/add
// @access  Private
exports.addToWallet = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid amount'
      });
    }

    const user = await User.findById(req.user.id);
    user.walletBalance += amount;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Wallet recharged successfully',
      data: {
        walletBalance: user.walletBalance
      }
    });
  } catch (error) {
    next(error);
  }
};