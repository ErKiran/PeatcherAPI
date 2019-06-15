const mongoose = require('mongoose');
const ScoreBoard = new mongoose.Schema({
    tournament: {
        name: {
            type: String,
            required: true
        },
        game: {
            level: {
                type: String,
                required: true
            },
            venue: {
                type: String
            },
            starting_time: {
                type: String,
                required: true
            },
            teams: [{
                name: String,
                required: true,
                player_performance: [
                    {
                        players: {
                            type: Schema.Types.ObjectId,
                            ref: 'team.tournament.team.players'
                        },
                        ball_faced: {
                            type: Number
                        },
                        ball_bowled: {
                            type: Number
                        },
                        run_scored: {
                            type: Number
                        },
                        wicket_taken: {
                            type: Number
                        },
                        run_scored: {
                            type: Number
                        },
                        extra_runs: {
                            type: Number
                        },
                        catch: {
                            type: Number
                        },
                        drop_catch: {
                            type: Number
                        },
                        run_out: {
                            type: Number
                        },
                        fairplay: {
                            type: Boolean,
                            default: true
                        },
                        no_of_4: {
                            type: Number
                        },
                        no_of_6: {
                            type: Number
                        },
                        is_hatrick: {
                            type: Boolean,
                            default: false
                        },
                        is_five_fer: {
                            type: Boolean,
                            default: false
                        },
                        is_match_winner: {
                            type: Boolean
                        },
                        is_MoM: {
                            type: Boolean
                        }
                    }
                ]
            }]
        }

    }
})