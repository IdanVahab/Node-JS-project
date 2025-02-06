const express = require('express'); // Import Express to create routes
const { getUserDetails, getAllUsers, addUser } = require('../controllers/usersController'); // Import functions from the controllers
const router = express.Router(); // Create a Router for handling user-related routes

/**
 * Route to fetch details about all users.
 * Handles GET requests to retrieve all users' first and last names.
 * Controller: getAllUsers
 * @name GET /api/about
 * @function
 * @memberof module:routes/users
 */
router.get('/about', getAllUsers);

/**
 * Route to add a new user.
 * Handles POST requests to add a new user to the database.
 * Controller: addUser
 * @name POST /api/add
 * @function
 * @memberof module:routes/users
 */
router.post('/add', addUser);

/**
 * Middleware to validate that an ID parameter is provided.
 * Sends a 400 Bad Request error if the ID parameter is missing.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.get('/:id?', (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }
        next();
    },
    /**
     * Route to fetch details about a specific user by ID.
     * Handles GET requests to retrieve details about a specific user.
     * Controller: getUserDetails
     * @name GET /api/:id
     * @function
     * @memberof module:routes/users
     */
    getUserDetails);

module.exports = router; // Export the Router to use it in app.js
