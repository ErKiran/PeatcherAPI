const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
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
    interest:
    {
        type: [String],
        required: true
    },
    course: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course'
        }
    ]
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

    })

module.exports = Student = mongoose.model('student', StudentSchema)