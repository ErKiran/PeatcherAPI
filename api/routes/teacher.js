const express = require('express');
const passport = require('passport');
const router = express.Router();
const Teacher = require('../../models/teacher');
const UserDetailsSchema = require('../../models/user_details');

router.post('/teacher', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const detail = await UserDetailsSchema.find({ _userId: req.user.id });
    if (req.user.isactive) {
        const teacherinfo = {
            image: req.body.image,
            previous_experience: req.body.previous_experience,
            bio: req.body.bio,
            _userId: req.user.id,
            user_detail: detail[0].id
        }
        const result = await new Teacher(teacherinfo).save();
        res.json(result);
    }
})

router.get('/teacher', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const teacher = await Teacher.find({ _userId: req.user.id }).populate('user_detail');
    res.json(teacher)
})

router.get('/teacher/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const teacher = await Teacher.find({ }).populate('user_detail');
    res.json(teacher)
})

module.exports = router;