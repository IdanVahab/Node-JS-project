const mongoose = require('mongoose');

/**
 * Mongoose schema for the User collection.
 */
const userSchema = new mongoose.Schema({
    /**
     * Unique identifier for the user.
     * This field is required and must be unique.
     * @type {String}
     */
    id: {
        type: String, // String field for the user's unique ID.
        required: true, // Mandatory field.
        unique: true, // Ensures the ID is unique in the collection.
    },

    /**
     * First name of the user.
     * This field is required.
     * @type {String}
     */
    first_name: {
        type: String, // String field for the user's first name.
        required: true, // Mandatory field.
    },

    /**
     * Last name of the user.
     * This field is required.
     * @type {String}
     */
    last_name: {
        type: String, // String field for the user's last name.
        required: true, // Mandatory field.
    },

    /**
     * Birthday of the user.
     * This field is required and must be a valid date.
     * @type {Date}
     */
    birthday: {
        type: Date, // Date field for the user's birthday.
        required: true, // Mandatory field.
    },

    /**
     * Marital status of the user.
     * This field is required and must be one of the allowed values.
     * @type {String}
     * @enum {['single', 'married', 'divorced', 'widowed']}
     */
    marital_status: {
        type: String, // String field for marital status.
        enum: ['single', 'married', 'divorced', 'widowed'], // Allowed values.
        required: true, // Mandatory field.
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically.

/**
 * Mongoose model for the User collection.
 * Represents a user document in the database.
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
