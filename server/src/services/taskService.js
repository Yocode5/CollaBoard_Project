const taskRepository = require('../repositories/taskRepository');

const fetchAllTasks = async () => {
  return await taskRepository.getAllTasks();
};

const fetchTaskById = async (id) => {
  return await taskRepository.getTaskById(id);
};

const createNewTask = async (taskData) => {
  return await taskRepository.createTask(taskData);
};

const modifyTask = async (id, taskData) => {
  return await taskRepository.updateTask(id, taskData);
};

const removeTask = async (id) => {
  return await taskRepository.deleteTask(id);
};

module.exports = { fetchAllTasks, fetchTaskById, createNewTask, modifyTask, removeTask };