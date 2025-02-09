const request = require('supertest');
const app = require('../app');

describe('GET /api/users/:id', () => {
    it('should return user details with total cost', async () => {
        const userId = "123123"; // Assuming this user exists
        const res = await request(app).get(`/api/users/${userId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', userId);
        expect(res.body).toHaveProperty('first_name');
        expect(res.body).toHaveProperty('last_name');
        expect(res.body).toHaveProperty('total');
        expect(typeof res.body.total).toBe('number'); // Ensure total is a number
    });

    it('should return 404 if user is not found', async () => {
        const res = await request(app).get('/api/users/000000'); // Non-existing user ID
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'User not found');
    });
});
