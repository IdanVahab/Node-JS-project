const mongoose = require('mongoose');

/**
 * Mongoose schema for the Cost collection.
 * Represents an expense item associated with a user.
 */
const costSchema = new mongoose.Schema({
    /**
     * Description of the cost.
     * @type {string}
     * @required
     */
    description: {
        type: String,
        required: true,
    },

    /**
     * Category of the cost. Must be one of the predefined values.
     * @type {string}
     * @enum ['food', 'health', 'housing', 'sports', 'education', 'other']
     * @required
     */
    category: {
        type: String,
        enum: ['food', 'health', 'housing', 'sports', 'education', 'other'],
        required: true,
        lowercase: true,
    },

    /**
     * User ID associated with the cost.
     * @type {string}
     * @required
     */
    userid: {
        type: String,
        required: true,
    },

    /**
     * Amount of the cost.
     * @type {number}
     * @required
     */
    sum: {
        type: Number,
        required: true,
    },

    /**
     * Date when the cost was recorded.
     * Defaults to the current date if not provided.
     * @type {Date}
     */
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

/**
 * Mongoose model for the Cost collection.
 * @typedef {Object} Cost
 * @property {string} description - Description of the cost.
 * @property {string} category - Category of the cost.
 * @property {string} userid - User ID associated with the cost.
 * @property {number} sum - Amount of the cost.
 * @property {Date} date - Date when the cost was recorded.
 */
const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;
