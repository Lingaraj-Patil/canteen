// src/utils/constants.js

const USER_ROLES = {
  ADMIN: 'admin',           // Full system access
  MANAGER: 'manager',       // Manage menu, orders, inventory
  CASHIER: 'cashier',       // Handle payments & orders
  KITCHEN: 'kitchen_staff', // View & update order status
  STUDENT: 'student',       // Place orders
  STAFF: 'staff'            // Place orders (employees)
};

const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  UPI: 'upi',
  WALLET: 'wallet'
};

const ITEM_CATEGORIES = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACKS: 'snacks',
  BEVERAGES: 'beverages',
  DESSERTS: 'desserts'
};

module.exports = {
  USER_ROLES,
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHODS,
  ITEM_CATEGORIES
};