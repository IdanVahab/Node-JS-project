const Cost = require('../models/costs'); // Make sure the path is correct
const { addCostSchema } = require('../utils/validation');


/**
 * Adds a new cost item to the database.
 * @param {Object} req - Express request object containing the cost details in the body.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.description - Description of the cost.
 * @param {string} req.body.category - Category of the cost (e.g., food, health).
 * @param {string} req.body.userid - User ID associated with the cost.
 * @param {number} req.body.sum - Amount of the cost.
 * @param {Date} [req.body.date] - Date of the cost (optional, defaults to current date).
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object with the created cost item or an error message.
 * @throws {Error} Returns a 400 error if validation fails or 500 for server errors.
 */
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


/**
 * Fetches a monthly report of costs grouped by categories.
 * @param {Object} req - Express request object containing query parameters.
 * @param {Object} req.query - The query parameters of the request.
 * @param {string} req.query.id - The user ID.
 * @param {number} req.query.year - The year for the report.
 * @param {number} req.query.month - The month for the report.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object with the monthly report grouped by categories or an error message.
 * @throws {Error} Returns a 400 error if parameters are missing or 500 for server errors.
 */
const getMonthlyReport = async (req, res) => {
    try {
        const { id, year, month } = req.query;

        // Check if the parameters were sent
        if (!id || !year || !month) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        // Fetch user expenses within the date range
        const costs = await Cost.find({ userid: id, date: { $gte: startDate, $lte: endDate } });

        // Initialize categories with empty arrays
        const groupedCosts = {
            food: [],
            health: [],
            housing: [],
            sports: [],
            education: []
        };

        // Sort costs by category
        costs.forEach(cost => {
            const costData = {
                sum: cost.sum,
                description: cost.description,
                day: new Date(cost.date).getDate()
            };

            if (groupedCosts[cost.category]) {
                groupedCosts[cost.category].push(costData);
            }
        });

        // Return the result in the required format
        res.json({
            userid: id,
            year: parseInt(year),
            month: parseInt(month),
            costs: groupedCosts
        });

    } catch (error) {
        console.error('Error in getMonthlyReport:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { addCost, getMonthlyReport };
