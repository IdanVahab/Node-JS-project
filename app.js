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
 * Middleware to parse form data from HTML forms.
 * This is necessary for handling form submissions using POST method.
 */
app.use(express.urlencoded({ extended: true })); // ✅ הוספנו כאן

/**
 * Establish a connection to the MongoDB database.
 * Uses the configuration defined in `config/db.js`.
 */
connectDB();

/**
 * Register user-related routes.
 * Handles API requests under `/api/users`.
 */
app.use('/api/users', usersRoutes);

/**
 * Register cost-related routes.
 * Handles API requests under `/api/costs`.
 */
app.use('/api/costs', costsRoutes);

/**
 * Route for the root endpoint.
 * Responds with a welcome message or basic information about the API.
 */
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Cost Management System</h1>
        <p>Use the following actions:</p>
        <ul>
            <li><a href="/add-cost">Add a New Cost</a></li>
            <li><a href="/add-user">Add a New User</a></li>
            <li><a href="/api/users/about">View Members</a></li>
            <li><a href="/api/costs/report?id=123123&year=2025&month=2">View Cost Report</a></li>
            <li><a href="/api/users/123123">View User Details</a></li>
            <li><a href="/api/users/team-members">View Developers</a></li>

        </ul>
    `);
});

/**
 * Route to display the form for adding a cost.
 */
app.get('/add-cost', (req, res) => {
    res.send(`
        <h1>Add a New Cost</h1>
        <form action="/api/costs/add" method="POST">
            <label for="userid">User ID:</label><br>
            <input type="text" id="userid" name="userid" required><br><br>

            <label for="description">Description:</label><br>
            <input type="text" id="description" name="description" required><br><br>

            <label for="category">Category:</label><br>
            <select id="category" name="category" required>
                <option value="food">Food</option>
                <option value="health">Health</option>
                <option value="housing">Housing</option>
                <option value="sports">Sports</option>
                <option value="education">Education</option>
            </select><br><br>

            <label for="sum">Amount:</label><br>
            <input type="number" id="sum" name="sum" required><br><br>

            <label for="date">Date (Optional):</label><br>
            <input type="date" id="date" name="date"><br><br>

            <button type="submit">Add Cost</button>
        </form>
    `);
});

/**
 * Route to display the form for adding a user.
 */
app.get('/add-user', (req, res) => {
    res.send(`
        <h1>Add a New User</h1>
        <form action="/api/users/add" method="POST">
            <label for="id">User ID:</label><br>
            <input type="text" id="id" name="id" required><br><br>

            <label for="first_name">First Name:</label><br>
            <input type="text" id="first_name" name="first_name" required><br><br>

            <label for="last_name">Last Name:</label><br>
            <input type="text" id="last_name" name="last_name" required><br><br>

            <label for="birthday">Birthday:</label><br>
            <input type="date" id="birthday" name="birthday" required><br><br>

            <label for="marital_status">Marital Status:</label><br>
            <select id="marital_status" name="marital_status" required>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
            </select><br><br>

            <button type="submit">Add User</button>
        </form>
    `);
});

/**
 * Export the Express app instance.
 * This allows testing and modular usage in other parts of the application.
 */
module.exports = app;
