const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const sgMail = require('@sendgrid/mail');

const User = require('../../models/user');
const { secretOrKey, sendGrid } = require('../../configs/dev');
const { validateUserInfo } = require('../../validations/user');

sgMail.setApiKey(sendGrid);

const router = express.Router();

router.post('/register', async (req, res) => {
    const { errors, isValid } = validateUserInfo(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isadmin: req.body.isadmin
        })
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        try {
            newUser.password = hash;
            const result = await newUser.save();
            const msg = {
                to: req.body.email,
                from: 'watcher@fantasy.com',
                templateId: 'd-53bf22258e54480d9ac1d457935356cd'
            };
            sgMail.send(msg);
            res.json(result)
        }
        catch (e) {
            throw e
        }
    }
    else {
        res.json(`The email ${req.body.email} has already been used.`)
    }

})

router.post('/login', async (req, res) => {
    const user = await User.find({ email: req.body.email });
    if (user === null) {
        res.status(404).json('Please Check the credentials')
    }
    else {
        const test = await bcrypt.compare(req.body.password, user[0].password);
        if (test === true) {
            const payload = { id: user[0].id, name: user[0].name, isadmin: user[0].isadmin };
            const token = jwt.sign(payload, secretOrKey, { expiresIn: 3600 });
            res.json({
                sucess: "true",
                token: `Bearer ${token}`
            })
        }
        else {
            res.status(404).json('Please Check the credentials')
        }
    }
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router