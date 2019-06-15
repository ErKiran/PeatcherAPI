const express = require('express');
const Team = require('../../models/team');
const passport = require('passport');
const mock = require('../../data/mock.json');

const router = express.Router();

router.post('/insert', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.isadmin === true) {
        await Team.deleteMany({})
        await Team.insertMany(mock);
        const result = await Team.find({});
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
        const newinfo = new Team({
            "tournament.name": req.body.tournament_name,
            "tournament.year": req.body.year,
            "tournament.location": req.body.location,
            "tournament.team.name": req.body.team_name,
            "tournament.team.captain": req.body.team_captain,
            "tournament.team.players.name": req.body.players_name,
            "tournament.team.players.role": req.body.players_role,
            "tournament.team.players.image_url": req.body.players_image_url,
            "tournament.team.players.dob": req.body.players_dob,
            "tournament.team.players.price": req.body.players_price,
        })
        const info = await Team.find({ 'tournament.team.players.name': req.body.players_name });
        console.log(info)
        if (info === null || info.length === 0) {
            const sended = await newinfo.save()
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