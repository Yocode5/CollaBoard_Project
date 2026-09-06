const userService = require('../services/userService');

// POST /api/users/register
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email, and password are required'
            });
        }

        const result = await userService.registerUser({ name, email, password });

        if (result.error) {
            return res.status(409).json({ message: result.error });
        }

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};


const getUserProfile = async (req, res, next) => {
    // To be implemented
    res.status(501).json({ message: 'Not implemented yet' });
};
const updateUserProfile = async (req, res, next) => {
    // To be implemented
    res.status(501).json({ message: 'Not implemented yet' });
};

module.exports = {
    registerUser,
    getUserProfile,
    updateUserProfile
};