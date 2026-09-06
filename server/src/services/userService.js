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
// Get user profile by ID
const getUserProfile = async (id) => {
    const user = await userRepository.getUserById(id);
    if (!user) return null;

    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
};

//  Update user profile
const updateUserProfile = async (id, userData) => {
    const updatedUser = await userRepository.updateUser(id, userData);
    if (!updatedUser) return null;

    return {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
    };
};

module.exports = {
  registerUser,
  getUserProfile,
  updateUserProfile
};