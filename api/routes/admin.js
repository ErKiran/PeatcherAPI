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

})

module.exports = router;