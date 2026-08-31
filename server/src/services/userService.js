const userRepository = require('../repositories/userRepository');

// Register a new user 
const registerUser = (userData) => {
  const { name, email, password } = userData;

  const existingUser = userRepository.getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already exists" };
  }

  const newUser = userRepository.createUser({ name, email, password });

  return { id: newUser.id, name: newUser.name, email: newUser.email };
};

const getUserProfile = (id) => {
  const user = userRepository.getUserById(id);
  if (!user) return null;

  return { id: user.id, name: user.name, email: user.email };
};

// Update user profile 
const updateUserProfile = (id, userData) => {
  const { name, email } = userData;

  // Check if the new email is already used by another user
  const existingUser = userRepository.getUserByEmail(email);
  if (existingUser && existingUser.id !== parseInt(id)) {
    return { error: "Email already in use by another user" };
  }

  const updatedUser = userRepository.updateUser(id, { name, email });
  if (!updatedUser) return null;

  // Return updated user without password
  return { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email };
};

module.exports = { registerUser, getUserProfile, updateUserProfile };
