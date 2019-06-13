const mongoose = require('mongoose');
const teamschema = new mongoose.Schema({
    tournament: [
        {
            name: {
                type: String,
                required: true
            },
            year: {
                type: Date,
                required: true
            },
            location: {
                type: [String],
            }
        }
    ],
    team: [
        {
            name: {
                type: String,
                required: true
            },
            captain: {
                type: String,
                required: true
            },
            players: [
                {
                    name: {
                        type: String,
                        required: true
                    },
                    role: {
                        type: String,
                        required: true
                    },
                    dob: {
                        type: String
                    },
                    image_url: {
                        type: String
                    },
                    price: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
})

module.exports = Team = mongoose.model('team', teamschema)