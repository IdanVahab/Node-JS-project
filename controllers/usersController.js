const Cost = require('../models/costs'); // Import the Cost model
const User = require('../models/users'); // Import the User model

/**
 * Adds a new user to the database.
 * @param {Object} req - Express request object containing user details in the body.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.id - Unique ID of the user.
 * @param {string} req.body.first_name - First name of the user.
 * @param {string} req.body.last_name - Last name of the user.
 * @param {string} req.body.birthday - Birthday of the user in YYYY-MM-DD format.
 * @param {string} req.body.marital_status - Marital status of the user (e.g., single, married).
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object with the created user or an error message.
 * @throws {Error} Returns a 400 error if validation fails or 500 for server errors.
 */
const addUser = async (req, res) => {
    try {
        const { id, first_name, last_name, birthday, marital_status } = req.body;

        if (!id || !first_name || !last_name || !birthday || !marital_status) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ id });
        if (existingUser) {
            return res.status(400).json({ error: `User with ID ${id} already exists` });
        }

        const newUser = new User({
            id,
            first_name,
            last_name,
            birthday,
            marital_status,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


/**
 * Fetches details of a specific user along with their total costs.
 * @param {Object} req - Express request object containing user ID in the URL parameters.
 * @param {Object} req.params - The URL parameters of the request.
 * @param {string} req.params.id - Unique ID of the user.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object with user details and total costs or an error message.
 * @throws {Error} Returns a 404 error if the user is not found or 500 for server errors.
 */
const getUserDetails = async (req, res) => {
    try {
        console.log('Received ID from request:', req.params.id); // בדיקת מזהה שהתקבל
        const user = await User.findOne({ id: req.params.id });
        console.log('User found in database:', user); // בדיקת המשתמש שנמצא

        if (!user) {
            console.log('User not found'); // אם המשתמש לא נמצא
            return res.status(404).json({ error: 'User not found' });
        }

        const costs = await Cost.find({ userid: req.params.id });
        console.log('Costs found for user:', costs); // הצגת העלויות שנמצאו

        const totalCosts = costs.reduce((sum, cost) => sum + cost.sum, 0);
        console.log('Total costs calculated:', totalCosts); // הצגת סך העלויות

        res.json({ id: user.id, first_name: user.first_name, last_name: user.last_name, total: totalCosts });
    } catch (error) {
        console.error('Error in getUserDetails:', error); // הדפסת שגיאה במידה ויש
        res.status(500).json({ error: 'Server error' });
    }
};


/**
 * Fetches a list of all users with their first and last names.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON array of users with first_name and last_name or an error message.
 * @throws {Error} Returns a 404 error if no users are found or 500 for server errors.
 */

const getAllUsers = async (req, res) => {
    try {
        console.log('Fetching users...');
        const users = await User.find({}, { first_name: 1, last_name: 1, _id: 0 }); // מסיר את השדה _id
        console.log('Users found in database:', users);

        if (!users || users.length === 0) {
            console.log('No users found in the database');
            return res.status(404).json({ error: 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({ error: 'Server error' });
    }
};



module.exports = { getUserDetails, getAllUsers, addUser };
