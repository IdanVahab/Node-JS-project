const Joi = require('joi');

// Schema for adding a cost
const addCostSchema = Joi.object({
    description: Joi.string().required().messages({
        'string.empty': 'Description is required.',
        'any.required': 'Description is required.',
    }),
    category: Joi.string().valid('food', 'health', 'housing', 'sports', 'education', 'other').required().messages({
        'any.only': 'Category must be one of the predefined values.',
        'any.required': 'Category is required.',
    }),
    userid: Joi.string().required().messages({
        'string.empty': 'User ID is required.',
        'any.required': 'User ID is required.',
    }),
    sum: Joi.number().greater(0).required().messages({
        'number.base': 'Sum must be a number.',
        'number.greater': 'Sum must be greater than 0.',
        'any.required': 'Sum is required.',
    }),
    date: Joi.date().optional(),
});

module.exports = { addCostSchema };
