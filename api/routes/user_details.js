const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserDetailsSchema = require('../../models/user_details');

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const check = await UserDetailsSchema.findOne({ _userId: req.user.id });
        if (!check) {
            if (req.user.isactive === true) {
                const msg = {
                    name: req.body.name,
                    sex: req.body.sex,
                    country: req.body.country,
                    dob: req.body.dob,
                    phone_number: req.body.phone_number,
                    image: req.body.image,
                    _userId: req.user.id
                }
                const result = await new UserDetailsSchema(msg).save();
                res.json(result)
            } else {
                res.json("You need to activate Account before registrating as Student")
            }
        }
        else {
            res.json(check)
        }
    }
    catch (e) {
        throw e
    }
})

router.patch('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await UserDetailsSchema.updateOne({ _userId: req.user.id }, { $set: req.body });
        const result = await UserDetailsSchema.find({ _userId: req.user.id });
        res.json(result);
    }
    catch (e) {
        throw e
    }
})

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const result = await UserDetailsSchema.find({ _userId: req.user.id });
        res.json(result);
    }
    catch (e) {
        throw e
    }
})

module.exports = router;