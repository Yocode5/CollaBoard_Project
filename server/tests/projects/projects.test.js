const request = require('supertest');
const app = require('../../src/app');

describe('Projects API', () => {
    let createdProjectId;

    const validProject = {
        title: 'Automated Test Project',
        startDate: '2026-09-12',
        endDate: '2026-09-20',
        description: 'Project created for automated API testing.'
    };

    test('should create a project successfully', async () => {
        const response = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send({
                ...validProject,
                members: [process.env.TEST_USER_ID]
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty(
            'message',
            'Project created successfully.'
        );
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data.title).toBe(validProject.title);

        createdProjectId = response.body.data._id;
    });

    test('should fetch all projects', async () => {
        const response = await request(app)
            .get('/api/projects')
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    test('should fetch a project by ID', async () => {
        const response = await request(app)
            .get(`/api/projects/${createdProjectId}`)
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body.data).toHaveProperty(
            '_id',
            createdProjectId
        );
        expect(response.body.data.title).toBe(validProject.title);
    });

    test('should update an existing project', async () => {
        const response = await request(app)
            .put(`/api/projects/${createdProjectId}`)
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send({
                ...validProject,
                members: [process.env.TEST_USER_ID],
                title: 'Updated Automated Test Project',
                description: 'Updated project description.'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty(
            'message',
            'Project updated successfully.'
        );
        expect(response.body.data.title).toBe(
            'Updated Automated Test Project'
        );
        expect(response.body.data.description).toBe(
            'Updated project description.'
        );
    });

    test('should reject a project containing an unregistered member', async () => {
        const response = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .send({
                title: 'Invalid Member Project',
                members: ['000000000000000000000000'],
                startDate: '2026-09-12',
                endDate: '2026-09-20',
                description: 'Project should be rejected.'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(
            'is not a registered user'
        );
    });
});