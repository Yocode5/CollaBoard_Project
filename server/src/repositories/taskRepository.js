let mockTasks = [
  { id: 1, title: "Design Database Schema", status: "Completed", assignee: "Samadhi", dueDate: "15/08/2026" },
  { id: 2, title: "Fix Authentication Bug", status: "In Progress", assignee: "Yasith", dueDate: "12/08/2026" }
];

const getAllTasks = () => mockTasks;

const getTaskById = (id) => mockTasks.find(task => task.id === parseInt(id));

const createTask = (taskData) => {
  const newTask = {
    id: mockTasks.length ? Math.max(...mockTasks.map(t => t.id)) + 1 : 1,
    ...taskData
  };
  mockTasks.push(newTask);
  return newTask;
};

const updateTask = (id, taskData) => {
  const index = mockTasks.findIndex(task => task.id === parseInt(id));
  if (index === -1) return null;
  mockTasks[index] = { ...mockTasks[index], ...taskData };
  return mockTasks[index];
};

const deleteTask = (id) => {
  const index = mockTasks.findIndex(task => task.id === parseInt(id));
  if (index === -1) return false;
  mockTasks.splice(index, 1);
  return true;
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };