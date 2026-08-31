// mock array to store users 
let mockUsers = [
  { id: 1, name: "Yasith", email: "yasith@collaboard.com", password: "password123" },
  { id: 2, name: "Sahseena", email: "sahseena@collaboard.com", password: "password456" },
  { id: 3, name: "Naduntha", email: "naduntha@collaboard.com", password: "password789" }
];

const getUserById = (id) => mockUsers.find(user => user.id === parseInt(id));

const getUserByEmail = (email) => mockUsers.find(user => user.email === email);

// Create a new user 
const createUser = (userData) => {
  const newUser = {
    id: mockUsers.length ? Math.max(...mockUsers.map(u => u.id)) + 1 : 1,
    ...userData
  };
  mockUsers.push(newUser);
  return newUser;
};

// Update an existing user's name and email
const updateUser = (id, userData) => {
  const index = mockUsers.findIndex(user => user.id === parseInt(id));
  if (index === -1) return null;
  mockUsers[index] = { ...mockUsers[index], ...userData };
  return mockUsers[index];
};

module.exports = { getUserById, getUserByEmail, createUser, updateUser };
