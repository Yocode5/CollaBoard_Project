const request = require('supertest');
const app = require('../../src/app');

describe('Projects API', () => {
    test('should reject a project containing an unregistered member', async () => {
        const response = await request(app)
            .post('/api/projects')
            .send({
                title: 'Test Project',
                members: ['000000000000000000000000'],
                startDate: '2026-09-12',
                endDate: '2026-09-20',
                description: 'Project created for testing.'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
            'is not a registered user'
        );
    });
});