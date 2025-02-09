const request = require('supertest'); // Import Supertest
const app = require('../app'); // Import the Express application

describe('POST /api/users/add', () => {
    it('should add a new user and return their details', async () => {
        const newUser = {
            id: "999999",
            first_name: "Test",
            last_name: "User",
            birthday: "1995-06-15",
            marital_status: "single"
        };

        const res = await request(app).post('/api/users/add').send(newUser);

        // Ensure status code is 201 (Created)
        expect(res.statusCode).toBe(201);

        // Ensure response includes correct user details
        expect(res.body).toHaveProperty('id', newUser.id);
        expect(res.body).toHaveProperty('first_name', newUser.first_name);
        expect(res.body).toHaveProperty('last_name', newUser.last_name);
    });

    it('should return 400 if required fields are missing', async () => {
        const res = await request(app).post('/api/users/add').send({
            id: "888888",
            first_name: "Missing Fields"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
