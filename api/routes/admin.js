const express = require('express');
const passport = require('passport');
const router = express.Router();
const Course = require('../../models/course');

router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (req.user.admin.is_admin === true) {
            const author = {
                name: req.body.name,
                image: req.body.image,
            }
            const rating = {
                star: req.body.star,
                number: req.body.number,
            }
            const price = {
                currency: req.body.currency,
                amount: req.body.amount,
            }
            const course = {
                title: req.body.title,
                desc: req.body.desc,
                images: req.body.images,
                currently_enrolled: req.body.currently_enrolled,
                author,
                rating,
                price
            }
            const obje = {
                course
            }
            console.log(obje)
            const result = await new Course(obje).save();
            res.json(result)
        }
        else {
            res.json({
                msg: "You should be logged in as admin to perform this task"
            })
        }
    } catch (e) {
        throw e
    }
})

router.get('/all/course', async (req, res) => {
    const all = await Course.find({});
    res.json(all)
})

router.get('/get', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let query = {}
        for (let key in req.query) {
            req.query[key] !== '' ? query[key] = req.query[key] : null
        }
        console.log(query)
        const result = await Course.find(query)
        res.json(result)
    }
    catch (e) {
        console.warn(e)
    }
})

module.exports = router;