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


// GET /api/users/profile/:id
const getUserProfile = async (req, res, next) => {
    try {
        const user = await userService.getUserProfile(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// PUT /api/users/profile/:id
const updateUserProfile = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const result = await userService.updateUserProfile(req.params.id, {
            name,
            email,
            password
        });

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    registerUser,
    getUserProfile,
    updateUserProfile
};