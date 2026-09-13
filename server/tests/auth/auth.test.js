const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/User');

describe('Authentication API', () => {

    const testUser = {
        name: 'Yasith',
        email: 'yasith.test@collaboard.com',
        password: 'Test@1234'
    };

    // Clean up the test user before and after all tests
    beforeAll(async () => {
        await User.deleteOne({ email: testUser.email });
    }, 30000);

    afterAll(async () => {
        await User.deleteOne({ email: testUser.email });
    }, 30000);

    // Test 1: Successful Registration
    it('should register a new user successfully', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User registered successfully');
        expect(response.body.data).toHaveProperty('token');
        expect(response.body.data.user).toHaveProperty('id');
        expect(response.body.data.user.name).toBe(testUser.name);
        expect(response.body.data.user.email).toBe(testUser.email);
    }, 15000);

    // Test 2: Registration with Duplicate Email
    it('should reject registration with a duplicate email', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Email already exists');
    }, 15000);

    // Test 3: Successful Login
    it('should login successfully and return a JWT token', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Login successful');
        expect(response.body.data).toHaveProperty('token');
        expect(response.body.data.user.email).toBe(testUser.email);
    }, 15000);

    // Test 4: Failed Login with Incorrect Password
    it('should reject login with an incorrect password', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: 'WrongPassword123'
            });

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Invalid email or password');
    }, 15000);
});
