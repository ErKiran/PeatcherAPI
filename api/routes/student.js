const express = require('express');
const passport = require('passport');
const router = express.Router();
const Student = require('../../models/student');
const UserDetailsSchema = require('../../models/user_details');

router.post('/student', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const detail = await UserDetailsSchema.find({ _userId: req.user.id });
    console.log(detail)
    if (req.user.isactive) {
        const studentinfo = {
            interest: req.body.interest,
            _userId: req.user.id,
            user_detail: detail[0].id
        }
        const result = await new Student(studentinfo).save();
        res.json(result);
    }
})

router.get('/student', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const student = await Student.find({ _userId: req.user.id }).populate('user_detail');
    res.json(student)
})

router.get('/student/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const student = await Student.find({}).populate('user_detail');
    res.json(student)
})

router.patch('/student', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await Student.updateOne({ _userId: req.user.id }, { $set: req.body });
        const result = await Student.find({ _userId: req.user.id });
        res.json(result);
    }
    catch (e) {
        throw e
    }
})

module.exports = router;