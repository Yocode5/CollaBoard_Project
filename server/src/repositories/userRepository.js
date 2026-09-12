const User = require('../models/User');

// Save a new user to MongoDB
const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// Check if email already exists in the database
const getUserByEmail = async (email) => {
    return await User.findOne({
        email: email.toLowerCase()
    });
};

// Get user by ID
const getUserById = async (id) => {
    return await User.findById(id).select('-password');
};

// Search users by name or email
const searchUsers = async (query) => {
    const searchRegex = new RegExp(query, 'i');

    return await User.find({
        $or: [
            { name: searchRegex },
            { email: searchRegex }
        ]
    })
        .select('_id name email')
        .limit(10);
};

// Update user
const updateUser = async (id, userData) => {
    const user = await User.findById(id);

    if (!user) {
        return null;
    }

    if (userData.name) {
        user.name = userData.name;
    }

    if (userData.email) {
        user.email = userData.email;
    }

    if (userData.password) {
        user.password = userData.password;
    }

    await user.save();

    return user;
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    searchUsers,
    updateUser
};