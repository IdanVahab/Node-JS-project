const express = require('express'); // Import Express to create routes
const { addCost, getMonthlyReport } = require('../controllers/costsController'); // Import functions from the controllers
const router = express.Router(); // Create a Router for handling cost-related routes

// Route to add a new cost
router.post('/add', addCost);

// Route to fetch a monthly report
router.get('/report', getMonthlyReport);

module.exports = router; // Export the Router to use it in app.js
