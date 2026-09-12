const taskService = require('../services/taskService');

const getTasks = async (req, res) => {
    try {
        const projectId = req.query.projectId;

        const tasks = await taskService.fetchAllTasks(projectId);

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await taskService.fetchTaskById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createTask = async (req, res) => {
    try {
        const newTask = await taskService.createNewTask(req.body);

        const io = req.app.get('io');

        if (io && newTask.projectId) {
            io.to(`project:${newTask.projectId}`).emit(
                'task:created',
                newTask
            );
        }

        res.status(201).json(newTask);
    } catch (error) {
        res.status(error.statusCode || 400).json({
            message: error.message
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const updatedTask = await taskService.modifyTask(
            req.params.id,
            req.body
        );

        const io = req.app.get('io');

        if (io && updatedTask.projectId) {
            io.to(`project:${updatedTask.projectId}`).emit(
                'task:updated',
                updatedTask
            );
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(error.statusCode || 400).json({
            message: error.message,
            currentVersion: error.currentVersion
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await taskService.removeTask(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        const io = req.app.get('io');

        if (io && deletedTask.projectId) {
            io.to(`project:${deletedTask.projectId}`).emit(
                'task:deleted',
                {
                    taskId: deletedTask._id,
                    projectId: deletedTask.projectId
                }
            );
        }

        res.status(204).send();
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};