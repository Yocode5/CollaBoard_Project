const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

router.get('/stats/:userId', dashboardController.getStats);

module.exports = router;