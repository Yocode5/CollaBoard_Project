const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRequest } = require('../middleware/validationMiddleware');

router.post('/login', validateRequest(['email', 'password']), authController.login);

router.post('/register', validateRequest(['name', 'email', 'password']), authController.register);

module.exports = router;