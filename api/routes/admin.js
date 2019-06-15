const express = require('express');
const Team = require('../../models/team');
const passport = require('passport');
const mock = require('../../data/mock.json');

const router = express.Router();

router.post('/insert', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.isadmin === true) {
        /*await Team.deleteMany({})
        await Team.insertMany(mock);*/
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
    if (req.user.isadmin === true) {
        const tournament = [], team = [], player = [];
        player.push({
            "name": req.body.players_name,
            "role": req.body.players_role,
            "image_url": req.body.players_image_url,
            "dob": req.body.players_dob,
            "price": req.body.players_price,
        })
        team.push({
            "name": req.body.team_name,
            "captain": req.body.team_captain,
            "players": player
        })
        tournament.push({
            "name": req.body.tournament_name,
            "year": req.body.year,
            "location": req.body.location,
            team
        })
        const all = new Team({
            tournament
        })
        const info = await Team.find({ 'tournament.team.players.name': req.body.players_name });
        if (info === null || info.length === 0) {
            const sended = await all.save()
            console.log(sended)
            res.json(sended)
        }
    }
})

router.get('/team', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const result = await Team.find({ 'tournament.team.name': req.query.name }).select({ 'tournament.team.players': req.query.name });
    res.json(result)
})


module.exports = router;