const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/insert', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.admin.is_admin === true && req.user.admin.is_techinical === true) {
        await Team.deleteMany({})
        const result = await Team.find({ "tournament.team.players.name": req.body.name });
        res.json(result)
    }
    else {
        res.json({
            msg: "You should be logged in as admin to perform this task"
        })
    }
})

router.post('/team', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.admin.is_admin === true) {
        const tournament = [], team = [], players = [];
        players.push({
            "name": req.body.players_name,
            "role": req.body.players_role,
            "image_url": req.body.players_image_url,
            "dob": req.body.players_dob,
            "price": req.body.players_price,
        })
        team.push({
            "name": req.body.team_name,
            "captain": req.body.team_captain,
            "players": players
        })
        tournament.push({
            "name": req.body.tournament_name,
            "year": req.body.year,
            "location": req.body.location,
            team
        })
        const check_team = await Team.find({ 'tournament.team.name': req.body.team_name });
        const check_tournament = await Team.find({ 'tournament.name': req.body.tournament_name, 'tournament.year': req.body.year });
        if (!(check_tournament.length === 0)) {
            if (!(check_team.length === 0)) {
                const info = await Team.find({ 'tournament.team.players.name': req.body.players_name });
                if (info === null || info.length === 0) {
                    const rty = await Team.findOneAndUpdate({ 'tournament.team.name': req.body.team_name }, { $addToSet: { 'tournament.$.team.0.players': players } })
                    res.json(rty)
                }
                else {
                    res.json({ error: `${req.body.players_name} is already in database` })
                }
            } else {
                checkduplicate(res, tournament, req.body.players_name, req.body.year, req.body.team_name)
            }
        }
        else {
            checkduplicate(res, tournament, req.body.players_name, req.body.year, req.body.team_name)
        }
    }
    else {
        res.json('You need to be logged in as Admin to perform this operation')
    }
})

router.patch('/update_players', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const player = {
            "name": req.body.player,
            "role": req.body.role,
            "image_url": req.body.image_url,
            "dob": req.body.dob,
            "price": req.body.price,
        }
        const player_to_be_updated = await Team.findOne({ 'tournament.team.players.name': req.body.player })
        const dis = player_to_be_updated.tournament[0].team[0].players[0].id;
        const result = await Team.updateOne({ 'tournament.team.players._id': dis }, { $set: { 'tournament.0.team.$.players': player } })
        res.json(result)
    }
    catch (e) {
        throw e
    }

})

router.get('/team', passport.authenticate('jwt', { session: false }), async (req, res) => {
    //const to = await ScoreBoard.insertMany(scoreboard);
    //res.json(to);
    const final = await Team.find({ 'tournament.team.name': req.query.team });
    res.json(final)
})

const checkduplicate = async (res, tournament, player, year, team) => {
    const all = new Team({
        tournament
    })
    const info = await Team.find({ 'tournament.team.players.name': player, 'tournament.year': year, 'tournament.team.name': team });
    if (info === null || info.length === 0) {
        const sended = await all.save()
        res.json(sended)
    } else {
        res.json({
            "error": "The player is already in the database"
        })
    }

}

module.exports = router;