const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');
const nodemailer = require('nodemailer');
const SendGridTransport = require('nodemailer-sendgrid-transport');
//const sgMail = require('@sendgrid/mail');

const User = require('../../models/user');
const VerifyMe = require('../../models/tokenverification');
const { secretOrKey, sendGrid } = require('../../configs/dev');
const { validateUserInfo } = require('../../validations/user');

const transporter = nodemailer.createTransport(SendGridTransport({
    auth: {
        api_key: sendGrid
    }
}));

//sgMail.setApiKey(sendGrid);

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
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
                'admin.is_admin': req.body.isadmin,
                'admin.is_techinical': req.body.istechinical
            })
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newUser.password, salt);
            try {
                newUser.password = hash;
                const result = await newUser.save();
                const token = new VerifyMe({
                    _userId: result._id,
                    token: crypto.randomBytes(16).toString('hex'),
                    for: 'Activate Email'
                });
                const token_dum = await token.save()
                /* const msg = {
                     to: req.body.email,
                     from: 'peteacher.com',
                     subject: 'Welcome to BestEverResume! Co:nfirm Your Email',
                     text: 'and easy to do anywhere, even with Node.js',
                     html: `<h1>You Sucessfully Signed Up! 
                     Click this link to activate your account 
                     <a href ="http://localhost:5000/user/activate-email/:${token_dum.token}">Link</a>
                     <p>Click this  to set a new password</p></h1>`,
                 };*/
                const mail = await transporter.sendMail({
                    to: req.body.email,
                    from: 'noreply@pteacher.com',
                    subject: 'Welcome to Peatcher! Confirm Your Email',
                    html: `<h1>You Sucessfully Signed Up! 
                    Click this link to activate your account 
                    <a href ="http://localhost:5000/api/user/activate-email/:${token_dum.token}">Link</a>
                    <p>Click this  to set a new password</p></h1>`
                });
                if (mail.message === 'success') {
                    res.json({
                        msg: `Activation Key has been sent to your mail ${req.body.email}`,
                        user: result
                    })
                }
            }
            catch (e) {
                throw e
            }
        }
        else {
            res.json(`The email ${req.body.email} has already been used.`)
        }
    }
    catch (e) {
        throw e
    }
})

router.post('/user/activate-email', async (req, res) => {
    const test_token = await VerifyMe.find({ token: req.body.token });
    if (test_token === null) {
        res.json('We are unable to find User by this token');
    }
    const user = await User.find({ _id: test_token[0]._userId, email: req.body.email });
    if (user === null) {
        res.json('The user and token are not associated');
    }
    await User.updateOne({ _id: test_token[0]._userId, }, { $set: { isactive: true } })
    res.json(user);
})

router.post('/forget-password', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        // Do nothing or send mail to user
    }

    const token = new VerifyMe({
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex'),
        for: 'Reset Password'
    });
    const token_dum = await token.save();
    await User.updateOne({ email: req.body.email }, { $set: { passwordResetToken: true } })
    res.json(user)
    //send-mail to user with token 
})

router.post('/user/reset-password', async (req, res) => {
    const test_token = await VerifyMe.find({ token: req.body.token, for: 'Reset Password' });
    if (test_token === null) {
        res.json('We are unable to find User by this token');
    }
    const user = await User.find({ _id: test_token[0]._userId, email: req.body.email })
    console.log(user)
    if (user === null) {
        res.json('The user and token are not associated');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    await User.updateOne({ _id: test_token[0]._userId }, { $set: { password: hash } })
    res.json(user);
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user === null || user.length === 0) {
            res.status(404).json('Please Check the credentials')
        }
        else {
            const test = await bcrypt.compare(req.body.password, user[0].password);
            if (test === true) {
                const payload = { id: user[0].id, name: user[0].name, isadmin: user[0].admin.isadmin, istechinical: user[0].admin.istechinical };
                const token = jwt.sign(payload, secretOrKey, { expiresIn: 3600 });
                res.json({
                    sucess: "true",
                    token: `${token}`
                })
            }
            else {
                res.status(404).json('Please Check the credentials')
            }
        }
    }
    catch (e) {
        console.warn(e)
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
