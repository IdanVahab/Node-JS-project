const Joi = require('joi');

/**
 * Joi schema for validating the request body when adding a new cost.
 * Ensures that all required fields are provided and valid.
 */
const addCostSchema = Joi.object({
    /**
     * Description of the cost.
     * Must be a non-empty string.
     */
    description: Joi.string().required().messages({
        'string.empty': 'Description is required.',
        'any.required': 'Description is required.',
    }),

    /**
     * Category of the cost.
     * Must be one of the predefined values: 'food', 'health', 'housing', 'sports', 'education', 'other'.
     */
    category: Joi.string().valid('food', 'health', 'housing', 'sports', 'education', 'other').required().messages({
        'any.only': 'Category must be one of the predefined values.',
        'any.required': 'Category is required.',
    }),

    /**
     * User ID associated with the cost.
     * Must be a non-empty string.
     */
    userid: Joi.string().required().messages({
        'string.empty': 'User ID is required.',
        'any.required': 'User ID is required.',
    }),

    /**
     * Amount of the cost.
     * Must be a positive number greater than 0.
     */
    sum: Joi.number().greater(0).required().messages({
        'number.base': 'Sum must be a number.',
        'number.greater': 'Sum must be greater than 0.',
        'any.required': 'Sum is required.',
    }),

    /**
     * Date when the cost was recorded.
     * This field is optional; if not provided, the server will use the current date.
     */
    date: Joi.date().optional(),
});

/**
 * Exports the validation schema for adding a cost.
 */
module.exports = { addCostSchema };
