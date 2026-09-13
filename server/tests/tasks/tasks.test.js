const request = require('supertest');
const app = require('../../src/app');

describe('Task API Integration Tests', () => {
    let createdTaskId;

    const testTask = {
        title: 'QA Backend Routes',
        status: 'In Progress',
        assignee: 'Samadhi',
        dueDate: '2026-09-15'
    };

    // Test POST
    it('should create a new task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send({
                ...testTask,
                projectId: process.env.TEST_PROJECT_ID
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe(testTask.title);

        createdTaskId = response.body._id;
    });

    // Test GET
    it('should fetch all tasks', async () => {
        const response = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    // Test GET by ID
    it('should fetch a single task by ID', async () => {
        const response = await request(app)
            .get(`/api/tasks/${createdTaskId}`)
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(createdTaskId);
    });

    // Test PUT
    it('should update an existing task', async () => {
        const response = await request(app)
            .put(`/api/tasks/${createdTaskId}`)
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send({
                ...testTask,
                projectId: process.env.TEST_PROJECT_ID,
                status: 'Completed',
                version: 0
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('Completed');
    });

    // Test DELETE
    it('should delete the task', async () => {
        const response = await request(app)
            .delete(`/api/tasks/${createdTaskId}`)
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

        expect(response.statusCode).toBe(204);
    });
});