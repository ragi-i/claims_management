const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    policyId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    premiumAmount: {
        type: Number,
        required: true
    },
    coverageAmount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    // Add any other fields as needed
});

const Policy = mongoose.model('Policy', policySchema);
module.exports = Policy;