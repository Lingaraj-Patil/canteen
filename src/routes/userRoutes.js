// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateProfile,
  updateUser,
  deleteUser,
  toggleUserStatus
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { USER_ROLES } = require('../utils/constants');

router.use(protect);

router.put('/profile', updateProfile);

router.get('/', authorize(USER_ROLES.ADMIN), getAllUsers);
router.get('/:id', authorize(USER_ROLES.ADMIN), getUser);
router.put('/:id', authorize(USER_ROLES.ADMIN), updateUser);
router.delete('/:id', authorize(USER_ROLES.ADMIN), deleteUser);
router.patch('/:id/toggle-status', authorize(USER_ROLES.ADMIN), toggleUserStatus);

module.exports = router;