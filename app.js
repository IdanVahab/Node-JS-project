require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express for managing the server
const connectDB = require('./config/db'); // Import the database connection function

// Initialize Express
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Load the routes
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/costs', require('./routes/costsRoutes'));

// Define the server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
