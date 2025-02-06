require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express for managing the server
const connectDB = require('./config/db'); // Import the database connection function
const usersRoutes = require('./routes/usersRoutes'); // Import user routes
const costsRoutes = require('./routes/costsRoutes'); // Import cost routes

/**
 * Initializes the Express application.
 * Sets up middleware, database connection, and route handling.
 */
const app = express();

/**
 * Middleware to parse JSON request bodies.
 * Ensures that incoming requests with JSON payloads are properly parsed.
 */
app.use(express.json());

/**
 * Establish a connection to the MongoDB database.
 * Uses the configuration defined in `config/db.js`.
 */
connectDB();

/**
 * Register user-related routes.
 * Handles API requests under `/api/users`.
 */
app.use('/api/users', require('./routes/usersRoutes'));

/**
 * Register cost-related routes.
 * Handles API requests under `/api/costs`.
 */
app.use('/api/costs', require('./routes/costsRoutes'));

/**
 * Export the Express app instance.
 * This allows testing and modular usage in other parts of the application.
 */
module.exports = app;
