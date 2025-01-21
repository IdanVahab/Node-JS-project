const express = require('express'); // Import Express to create routes
const { getUserDetails, getAllUsers } = require('../controllers/usersController'); // Import functions from the controllers
const router = express.Router(); // Create a Router for handling user-related routes

// Route to fetch all user names
router.get('/about', getAllUsers);

// Route to fetch user details by ID
router.get('/:id', getUserDetails);

module.exports = router; // Export the Router to use it in app.js
