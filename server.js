const app = require('./app'); // Import the app instance

/**
 * The port on which the server will listen.
 * If `PORT` is defined in the environment variables, it will be used.
 * Otherwise, it defaults to 5000.
 * @constant {number}
 */
const PORT = process.env.PORT || 5000;

/**
 * Starts the Express server and listens on the defined port.
 * Logs a message to the console once the server is running.
 */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
