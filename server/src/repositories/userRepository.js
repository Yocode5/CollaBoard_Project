const User = require('../models/userModel');

// Save a new user to MongoDB
const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// Check if email already exists in the database
const getUserByEmail = async (email) => {
    return await User.findOne({ email: email.toLowerCase() });
};

const getUserById = async (id) => {
    // To be implemented for GET /profile/:id
};

const updateUser = async (id, userData) => {
    // To be implemented for PUT /profile/:id
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUser
};