const User = require('../models/User');

// Find a user by ID
const getUserById = async (id) => {
    return await User.findById(id);
};

// Find a user by email
const getUserByEmail = async (email) => {
    return await User.findOne({ email: email.toLowerCase() });
};

// Create a new user
const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// Update an existing user
const updateUser = async (id, userData) => {
    return await User.findByIdAndUpdate(
        id,
        userData,
        { new: true, runValidators: true }
    );
};

module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    updateUser
};