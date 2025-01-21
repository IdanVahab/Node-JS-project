const Cost = require('../models/costs'); // Import the Cost model
const User = require('../models/users'); // Import the User model

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


const getAllUsers = async (req, res) => {
    try {
        console.log('Fetching users...'); // בדיקת אם הפונקציה מופעלת
        const users = await User.find({}, 'first_name last_name'); // שליפת שמות בלבד
        console.log('Users found in database:', users); // הצגת המשתמשים שנמצאו

        if (!users || users.length === 0) {
            console.log('No users found in the database'); // אם אין משתמשים
            return res.status(404).json({ error: 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getAllUsers:', error); // הדפסת שגיאה במידה ויש
        res.status(500).json({ error: 'Server error' });
    }
};



module.exports = { getUserDetails, getAllUsers };
