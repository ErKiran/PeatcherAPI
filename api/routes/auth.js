const User = require('../../models/user');
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isadmin: req.body.isadmin
        })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => res.json(user))
            })
        })
    }
    else {
        res.json(`The email ${req.body.email} has already been used.`)
    }

})

router.get('/test', async (req, res) => {
    const user = await User.find({});
    console.log(user)
    res.json('Hello World')
})

module.exports = router