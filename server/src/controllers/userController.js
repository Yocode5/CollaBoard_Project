const userService = require('../services/userService');

// Register a new user
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            });
        }

        const result = await userService.registerUser({
            name,
            email,
            password
        });

        if (result.error) {
            return res.status(409).json({
                message: result.error
            });
        }

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// Get user profile
const getUserProfile = async (req, res, next) => {
    try {
        const user = await userService.getUserProfile(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Update user profile
const updateUserProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const result = await userService.updateUserProfile(
            req.params.id,
            { name, email }
        );

        if (!result) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (result.error) {
            return res.status(409).json({
                message: result.error
            });
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    getUserProfile,
    updateUserProfile
};