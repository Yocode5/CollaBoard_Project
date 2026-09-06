const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile/:id', authMiddleware, userController.getUserProfile);

router.put('/profile/:id', authMiddleware, userController.updateUserProfile);

module.exports = router;