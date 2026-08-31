const getUserDashboardStats = async (userId) => {
    
    const enrolledProjects = 14;
    const tasksPending = 5;
    const tasksCompleted = 10;

    return {
        enrolledProjects,
        tasksPending,
        tasksCompleted
    };
};

module.exports = {
    getUserDashboardStats
};