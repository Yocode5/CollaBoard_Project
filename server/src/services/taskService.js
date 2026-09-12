const taskRepository = require('../repositories/taskRepository');

const fetchAllTasks = async (projectId) => {
    return await taskRepository.getAllTasks(projectId);
};

const fetchTaskById = async (id) => {
    return await taskRepository.getTaskById(id);
};

const createNewTask = async (taskData) => {
    return await taskRepository.createTask(taskData);
};

const modifyTask = async (id, taskData) => {
    const expectedVersion = Number(taskData.version);

    if (!Number.isInteger(expectedVersion) || expectedVersion < 0) {
        const error = new Error('A valid task version is required.');
        error.statusCode = 400;
        throw error;
    }

    const updateData = {
        ...taskData
    };

    delete updateData.version;

    const result = await taskRepository.updateTask(
        id,
        updateData,
        expectedVersion
    );

    if (result.notFound) {
        const error = new Error('Task not found.');
        error.statusCode = 404;
        throw error;
    }

    if (result.conflict) {
        const error = new Error(
            'Task was changed by another user. Please refresh and try again.'
        );
        error.statusCode = 409;
        error.currentVersion = result.currentVersion;
        throw error;
    }

    return result.task;
};

const removeTask = async (id) => {
    return await taskRepository.deleteTask(id);
};

module.exports = {
    fetchAllTasks,
    fetchTaskById,
    createNewTask,
    modifyTask,
    removeTask
};