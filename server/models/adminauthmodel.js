const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
       
    },
    // You can add more fields as needed
}, { timestamps: true });

const Adminmodel = mongoose.model('Adminmodel', adminSchema);

module.exports = Adminmodel;