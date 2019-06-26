const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = ContactUS = mongoose.model('contact_us', ContactSchema)