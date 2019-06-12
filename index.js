const express = require('express');
const mongoose = require('mongoose');
const { MLab } = require('./configs/dev');
const bodyParser = require('body-parser');
const passport = require('passport')

const auth = require('./api/routes/auth')

process.setMaxListeners(0);
mongoose.set('useCreateIndex', true);


mongoose
    .connect(MLab, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session())
require('./configs/passport')(passport)

app.use('/', auth);

const port = process.env.PORT || 5000;

app.listen(port);

module.exports = app;