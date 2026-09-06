const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

const getUserDashboardStats = async (userId) => {
    const user = await User.findById(userId).select('name');

    if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
    }

    const enrolledProjects = await Project.countDocuments({
        members: user.name
    });

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