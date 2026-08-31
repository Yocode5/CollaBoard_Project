const taskService = require('../services/taskService');

const getTasks = (req, res) => {
  const tasks = taskService.fetchAllTasks();
  res.status(200).json(tasks);
};

const getTask = (req, res) => {
  const task = taskService.fetchTaskById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.status(200).json(task);
};

const createTask = (req, res) => {
  const newTask = taskService.createNewTask(req.body);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const updatedTask = taskService.modifyTask(req.params.id, req.body);
  if (!updatedTask) return res.status(404).json({ message: "Task not found" });
  res.status(200).json(updatedTask);
};

const deleteTask = (req, res) => {
  const success = taskService.removeTask(req.params.id);
  if (!success) return res.status(404).json({ message: "Task not found" });
  res.status(204).send();
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };