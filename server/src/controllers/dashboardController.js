const dashboardService = require('../services/dashboardService');

const getStats = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const stats = await dashboardService.getUserDashboardStats(userId);

        return res.status(200).json({
            success: true,
            message: 'Dashboard stats retrieved',
            data: stats
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStats
};