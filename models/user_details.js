const mongoose = require('mongoose');
const UserDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    phone_number: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

module.exports = UserDetails = mongoose.model('user_details', UserDetailsSchema)