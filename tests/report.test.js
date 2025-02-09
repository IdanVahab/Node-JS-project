const request = require('supertest'); // Import Supertest
const app = require('../app'); // Import the Express application

describe('GET /api/costs/report', () => {
    it('should return a monthly report grouped by categories', async () => {
        const res = await request(app).get('/api/costs/report?id=123123&year=2025&month=2');

        // Ensure status code is 200 (Success)
        expect(res.statusCode).toBe(200);

        // Ensure the response contains the correct structure
        expect(res.body).toHaveProperty('userid', '123123');
        expect(res.body).toHaveProperty('year', 2025);
        expect(res.body).toHaveProperty('month', 2);

        // Ensure all categories exist in the response
        expect(res.body.costs).toHaveProperty('food');
        expect(res.body.costs).toHaveProperty('health');
        expect(res.body.costs).toHaveProperty('housing');
        expect(res.body.costs).toHaveProperty('sports');
        expect(res.body.costs).toHaveProperty('education');
    });

    it('should return empty categories if no costs exist', async () => {
        const res = await request(app).get('/api/costs/report?id=000000&year=2025&month=2');

        expect(res.statusCode).toBe(200);
        expect(res.body.costs).toEqual({
            food: [],
            health: [],
            housing: [],
            sports: [],
            education: []
        });
    });
});
