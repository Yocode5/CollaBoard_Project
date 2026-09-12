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

const updateTask = async (id, taskData, expectedVersion) => {
    const existingTask = await Task.findById(id).select('_id version');

    if (!existingTask) {
        return {
            task: null,
            notFound: true,
            conflict: false
        };
    }

    if (existingTask.version !== expectedVersion) {
        return {
            task: null,
            notFound: false,
            conflict: true,
            currentVersion: existingTask.version
        };
    }

    const updatedTask = await Task.findOneAndUpdate(
        {
            _id: id,
            version: expectedVersion
        },
        {
            $set: taskData,
            $inc: {
                version: 1
            }
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedTask) {
        return {
            task: null,
            notFound: false,
            conflict: true
        };
    }

    return {
        task: updatedTask,
        notFound: false,
        conflict: false
    };
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