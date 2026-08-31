const dashboardService = require('../services/dashboardService');

const getDashboardStats = async (req, res, next) => {
    try {
        const userId = req.user?.id || 1;
        
        const stats = await dashboardService.getUserDashboardStats(userId);
        
        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardStats
};