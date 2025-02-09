const request = require('supertest');
const app = require('../app'); // טעינת האפליקציה

describe('GET /api/users/about', () => {
    it('should return a list of team members with only first and last names', async () => {
        const res = await request(app).get('/api/users/about');

        // בדיקה שהשרת מחזיר סטטוס 200
        expect(res.statusCode).toBe(200);

        // בדיקה שהתוצאה היא מערך
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0); // לפחות משתמש אחד ברשימה

        // רשימת השמות שאנו מצפים שייכללו בתשובה
        const expectedUsers = [
            { first_name: "Idan", last_name: "Vahab" },
            { first_name: "Idan", last_name: "Marmor" },
            { first_name: "Arad", last_name: "Ben-Eliezer" }
        ];

        // בדיקה שהתוצאה מכילה את השמות הצפויים (אך לא מחייבת רק אותם)
        expectedUsers.forEach(expectedUser => {
            expect(res.body).toEqual(expect.arrayContaining([expectedUser]));
        });

        // בדיקה שכל משתמש מכיל **רק** first_name ו-last_name
        res.body.forEach(user => {
            expect(Object.keys(user)).toEqual(['first_name', 'last_name']);
        });
    });
});
