const mongoose = require('mongoose'); // Import Mongoose for database connection

/**
 * Establishes a connection to the MongoDB database.
 * Uses the connection string defined in the environment variable `MONGO_URI`.
 * If the connection is successful, logs a confirmation message.
 * If the connection fails, logs the error message and exits the process.
 * @async
 * @function connectDB
 * @throws {Error} If the connection to MongoDB fails.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB; // Export the database connection function
