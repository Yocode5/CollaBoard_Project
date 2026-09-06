const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRepository = require('../repositories/userRepository');

class AuthService {
    async login(email, password) {
        if (!email || !password) {
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }

        const user = await userRepository.getUserByEmail(email);

        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return {
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        };
    }

    async register(userData) {
        if (!userData.name || !userData.email || !userData.password) {
            const error = new Error(
                'Name, email, and password are required for registration'
            );
            error.statusCode = 400;
            throw error;
        }

        const existingUser = await userRepository.getUserByEmail(
            userData.email
        );

        if (existingUser) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = await userRepository.createUser({
            name: userData.name,
            email: userData.email,
            password: hashedPassword
        });

        const token = jwt.sign(
            {
                id: newUser._id,
                email: newUser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return {
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name
            }
        };
    }
}

module.exports = new AuthService();