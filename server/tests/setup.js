require('dotenv').config({
    path: require('path').join(__dirname, '.env.test')
});

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../src/models/User');
const Project = require('../src/models/Project');

jest.setTimeout(30000);

beforeAll(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000,
            connectTimeoutMS: 15000
        });

        await User.deleteMany({
            email: 'testuser@collaboard.test'
        });

        const hashedPassword = await bcrypt.hash(
            'TestPassword123!',
            10
        );

        const testUser = await User.create({
            name: 'Test User',
            email: 'testuser@collaboard.test',
            password: hashedPassword
        });

        const testProject = await Project.create({
            title: 'Test Project',
            members: [testUser._id],
            startDate: '2026-09-12',
            endDate: '2026-09-20',
            description: 'Project used for automated tests.'
        });

        process.env.TEST_USER_ID = testUser._id.toString();
        process.env.TEST_PROJECT_ID = testProject._id.toString();

        process.env.TEST_TOKEN = jwt.sign(
            {
                id: testUser._id,
                email: testUser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );
    } catch (error) {
        console.error('\nTEST DATABASE CONNECTION FAILED:\n');
        console.error(error);
        throw error;
    }
});

afterAll(async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            await Project.deleteMany({
                _id: process.env.TEST_PROJECT_ID
            });

            await User.deleteMany({
                email: 'testuser@collaboard.test'
            });

            await mongoose.connection.close();
        }
    } catch (error) {
        console.error('\nTEST DATABASE CLEANUP FAILED:\n');
        console.error(error);
        throw error;
    }
});