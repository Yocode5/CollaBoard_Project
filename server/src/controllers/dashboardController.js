const dashboardService = require('../services/dashboardService');
const { successResponse } = require('../utils/response');

const getStats = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const stats = await dashboardService.getUserDashboardStats(userId);
        return successResponse(res, 200, 'Dashboard stats retrieved', stats);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStats
};