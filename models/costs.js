const mongoose = require('mongoose');

// Cost Schema def
const costSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['food', 'health', 'housing', 'sports', 'education', 'other'],
        required: true,
        lowercase: true,
    },
    userid: {
        type: String,
        required: true,
    },
    sum: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Model Creation
const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;
