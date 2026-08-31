const taskRepository = require('../repositories/taskRepository');

const fetchAllTasks = () => {
  return taskRepository.getAllTasks();
};

const fetchTaskById = (id) => {
  return taskRepository.getTaskById(id);
};

const createNewTask = (taskData) => {
  return taskRepository.createTask(taskData);
};

const modifyTask = (id, taskData) => {
  return taskRepository.updateTask(id, taskData);
};

const removeTask = (id) => {
  return taskRepository.deleteTask(id);
};

module.exports = { fetchAllTasks, fetchTaskById, createNewTask, modifyTask, removeTask };