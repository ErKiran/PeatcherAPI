const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    course: {
        title: {
            type: String,
            required: true,
            unique: true
        },
        desc: {
            type: String,
            required: true
        },
        images: {
            type: String,
            required: true
        },
        author:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'teacher'
        },
        rating: [{
            star: {
                type: Number
            },
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'student'
            }
        }],
        price: {
            currency: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        },
        currently_enrolled: {
            type: Number
        },

    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

    });

module.exports = Course = mongoose.model('course', CourseSchema)