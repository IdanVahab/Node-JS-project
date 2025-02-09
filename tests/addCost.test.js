const request = require('supertest'); // Import Supertest
const app = require('../app'); // Import the Express application

describe('POST /api/costs/add', () => {
    it('should add a new cost item and return it', async () => {
        const newCost = {
            userid: "123123",
            description: "Dinner",
            category: "food",
            sum: 50
        };

        const res = await request(app).post('/api/costs/add').send(newCost);

        // Ensure status code is 201 (Created)
        expect(res.statusCode).toBe(201);

        // Ensure response contains correct cost details
        expect(res.body).toHaveProperty('description', newCost.description);
        expect(res.body).toHaveProperty('category', newCost.category);
        expect(res.body).toHaveProperty('sum', newCost.sum);
    });

    it('should return 400 if required fields are missing', async () => {
        const res = await request(app).post('/api/costs/add').send({
            userid: "123123",
            description: "Missing Fields"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
