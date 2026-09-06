const express = require('express');

const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get(
    '/stats/:userId',
    authMiddleware,
    dashboardController.getStats
);

module.exports = router;