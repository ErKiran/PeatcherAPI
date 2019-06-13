const mongoose = require('mongoose');
const user_team = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    tournament: {
        type: String,
        required: true
    },
    players: [
        {
            name: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = UserTeam = mongoose.model('user_team', user_team)