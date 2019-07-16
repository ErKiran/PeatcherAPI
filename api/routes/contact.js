const express = require('express');
const router = express.Router();
const ContactUs = require('../../models/contactus');

router.post('/', async (req, res) => {
    try {
        const result = await new ContactUs(req.body).save();
        res.json(result)
    }
    catch (e) {
        throw e
    }
})

module.exports = router;