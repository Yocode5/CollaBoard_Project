const Project = require('../models/Project');
const Task = require('../models/Task');

const getUserDashboardStats = async (userId) => {
    
    const enrolledProjects = await Project.countDocuments({ members: userId });
    
    const tasksPending = await Task.countDocuments({ 
        assignedTo: userId, 
        status: 'pending' 
    });
    
    const tasksCompleted = await Task.countDocuments({ 
        assignedTo: userId, 
        status: 'completed' 
    });

    return {
        enrolledProjects,
        tasksPending,
        tasksCompleted
    };
};

module.exports = {
    getUserDashboardStats
};