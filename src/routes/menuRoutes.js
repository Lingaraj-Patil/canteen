// src/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability
} = require('../controllers/menuController');
const { protect, isAdminOrManager } = require('../middleware/authMiddleware');

router.get('/', getAllMenuItems);
router.get('/:id', getMenuItem);

router.use(protect);
router.use(isAdminOrManager);

router.post('/', createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);
router.patch('/:id/toggle-availability', toggleAvailability);

module.exports = router;