const express = require('express');
const router = express.Router();
const ContactUs = require('../../models/contactus');

router.post('/', async (req, res) => {
    try {
        const msg = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        }
        const result = await new ContactUs(msg).save();
        res.json(result)
    }
    catch (e) {
        throw e
    }
})

module.exports = router;