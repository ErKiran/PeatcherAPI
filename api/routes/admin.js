const express = require('express');
const Team = require('../../models/team');
const passport = require('passport');
const mock = require('../../data/mock.json');


const router = express.Router();

router.post('/team', passport.authenticate('jwt', { session: false }), async (req, res) => {
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

router.get('/team', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const result = await Team.find({ 'team.name': req.query.name }).select({ 'team.players': req.query.name });
    res.json(result)
})


module.exports = router;