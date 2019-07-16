const express = require('express');
const passport = require('passport');
const router = express.Router();
const Course = require('../../models/course');
const Teacher = require('../../models/teacher')

router.post('/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const check = await Teacher.find({ _userId: req.user.id })
        if (check.length !== 0) {
            const courseinfo = {
                title: req.body.title,
                desc: req.body.desc,
                images: req.body.image,
                "price.currency": req.body.currency,
                "price.amount": req.body.amount,
                author: check[0].id
            }
            const result = await new Course(courseinfo).save();
            res.json(result);
        }
        else {
            res.json('You need to be registered as teacher to add the course');
        }
    } catch (e) {
        throw e
    }
})

router.get('/all', async (req, res) => {
    const all = await Course.find({}).populate('author');
    res.json(all)
})

/**
 * Dynamic Search
 */

router.get('/get', async (req, res) => {
    try {
        let query = {}
        for (let key in req.query) {
            req.query[key] !== '' ? query[key] = req.query[key] : null
        }
        console.log(query)
        const result = await Course.find(query).populate('author')
        res.json(result)
    }
    catch (e) {
        console.warn(e)
    }
})


module.exports = router;