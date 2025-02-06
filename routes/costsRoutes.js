const express = require('express'); // Import Express to create routes
const { addCost, getMonthlyReport } = require('../controllers/costsController'); // Import functions from the controllers
const router = express.Router(); // Create a Router for handling cost-related routes

/**
 * Route to add a new cost.
 * Handles POST requests to add a new cost entry for a user.
 * Controller: addCost
 * @name POST /api/add
 * @function
 * @memberof module:routes/costs
 */
router.post('/add', addCost);

/**
 * Route to fetch a monthly report for a user.
 * Handles GET requests to retrieve all cost entries for a specific user, year, and month.
 * Controller: getMonthlyReport
 * @name GET /api/report
 * @function
 * @memberof module:routes/costs
 */
router.get('/report', getMonthlyReport);

module.exports = router; // Export the Router to use it in app.js
