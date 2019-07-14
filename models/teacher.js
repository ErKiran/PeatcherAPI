const mongoose = require('mongoose');
const TeacherSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    user_detail: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user_details'
    },
    previous_experience: {
        type: String,
        enum: [
            'In Person(Formally)',
            'In Person(Informally',
            'Online',
            'Other'
        ],
        default: 'Other'
    },
    bio: {
        type: String,
        required: true,
        max: 2048,
        min: 40
    }

}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

    })

module.exports = Teacher = mongoose.model('teacher', TeacherSchema)