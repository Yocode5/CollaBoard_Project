const Task = require('../models/Task');

const getAllTasks = async (projectId) => {
    const filter = projectId ? { projectId } : {};

    return await Task.find(filter);
};

const getTaskById = async (id) => {
    return await Task.findById(id);
};

const createTask = async (taskData) => {
    return await Task.create(taskData);
};

const updateTask = async (id, taskData) => {
    return await Task.findByIdAndUpdate(
        id,
        taskData,
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};