const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /api/users/register - Register a new user (implemented)
router.post('/register', userController.registerUser);

// GET /api/users/profile/:id - Get user profile by ID
router.get('/profile/:id', userController.getUserProfile);

// PUT /api/users/profile/:id - Update user profile by ID
router.put('/profile/:id', userController.updateUserProfile);

module.exports = router;