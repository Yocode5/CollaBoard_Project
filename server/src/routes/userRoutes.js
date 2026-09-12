const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Search registered users
router.get(
    '/search',
    authMiddleware,
    userController.searchUsers
);

// Get user profile
router.get(
    '/profile/:id',
    authMiddleware,
    userController.getUserProfile
);

// Update user profile
router.put(
    '/profile/:id',
    authMiddleware,
    userController.updateUserProfile
);

module.exports = router;