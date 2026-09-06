const userRepository = require('../repositories/userRepository');

// Register a new user
const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if email is already taken
  const existingUser = await userRepository.getUserByEmail(email);
  if (existingUser) {
    return { error: 'Email already exists' };
  }

  // Save user to database
  const newUser = await userRepository.createUser({ name, email, password });

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email
  };
};
const getUserProfile = async (id) => {
  // To be implemented for GET /profile/:id
};

//  Update user profile
const updateUserProfile = async (id, userData) => {

};

module.exports = {
  registerUser,
  getUserProfile,
  updateUserProfile
};