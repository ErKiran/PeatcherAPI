const mongoose = require('mongoose');
const user_team = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    tournament: [
        {
            name: {
                type: String,
                required: true
            },
            mode: {
                type: String,
                required: true
            },
            team: [
                {
                    players: [
                        {
                            name: {
                                type: String,
                                required: true
                            }
                        }
                    ],
                    captain: {
                        type: String,
                        required: true
                    },
                    vice_captain: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]

})

module.exports = UserTeam = mongoose.model('user_team', user_team)