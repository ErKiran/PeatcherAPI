const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    course: {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        images: {
            type: String,
            required: true
        },
        author: {
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        },
        rating: {
            star: {
                type: Number,
                required: true
            },
            number: {
                type: String,
                required: true
            },
        },
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
            type: Number,
            required: true
        },

    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

    });

module.exports = Course = mongoose.model('course', CourseSchema)