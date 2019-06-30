const express = require('express');
const router = express.Router();
const Course = require('../../models/course');
const Teacher = require('../../models/teacher')

router.post('/teacher/course', async (req, res) => {
    if (req.user.isactive) {
        const check = await Teacher.findById(req.user.id)
        if (check) {
            const courseinfo = {
                title: req.body.title,
                desc: req.body.desc,
                images: req.body.image,
                "price.currency": req.body.currency,
                "price.amount": req.body.amount,
            }
            const result = await new Course(courseinfo).save();
            res.json(result);
        }
        else {
            res.json('You should be logged in as teacher to perform this operation')
        }
    }
    else {
        res.json('Activate Account before continue')
    }
})


module.exports = router;