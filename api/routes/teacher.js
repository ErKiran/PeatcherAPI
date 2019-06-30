const express = require('express');
const passport = require('passport');
const router = express.Router();
const Teacher = require('../../models/teacher');

router.post('/user/teacher', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.isactive) {
        const teacherinfo = {
            image: req.body.image,
            previous_experience: req.body.previous_experience,
            bio: req.body.bio,
            _userId: req.user.id
        }
        const result = await new Teacher(teacherinfo).save();
        res.json(result);
    }
})

module.exports = router;