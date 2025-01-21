const Cost = require('../models/costs'); // Make sure the path is correct

const { addCostSchema } = require('../utils/validation');
const addCost = async (req, res) => {
    try {
        const { description, category, userid, sum } = req.body;
        const date = req.body.date || new Date(); // Use current date if 'date' is not provided

        // Validate input
        const { error } = addCostSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }


        // Create and save the new cost
        const cost = new Cost({
            description,
            category,
            userid,
            sum,
            date, // Use the validated date
        });

        await cost.save();
        res.status(201).json(cost);
    } catch (error) {
        console.error('Error in addCost:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getMonthlyReport = async (req, res) => { // Function to fetch a monthly report
    try {
        const { id, year, month } = req.query; // Extract parameters from the query string

        // Validation: Check if required parameters are missing
        if (!id || !year || !month) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const startDate = new Date(year, month - 1, 1); // Calculate the start of the month
        const endDate = new Date(year, month, 0); // Calculate the end of the month

        const costs = await Cost.find({ userid: id, date: { $gte: startDate, $lte: endDate } }); // Fetch costs within the specified date range
        res.json(costs); // Return the list of costs
    } catch (error) {
        res.status(500).json({ error: 'Server error' }); // Handle server errors
    }
};
module.exports = { addCost, getMonthlyReport };
