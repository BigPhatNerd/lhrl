const express = require("express");
const connectDB = require('./config/db');

require('dotenv').config();
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const path = require('path');
const request = require('request');
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4390;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes'));

app.use(passport.initialize());
app.use(session({ secret: 'whatever', resave: true, saveUninitialized: true }));

connectDB();
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);

});

app.get('/', (req, res) => {
    // res.send("Ngrok is working! Path Hit: " + req.url);
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/twitter/login', passport.authenticate('twitter'), (req, res) => console.log(res));
app.get('/auth/twitter/callback', (req, res) => (res.send("Maybe we are getting somewhere?: " + req.url)));
app.get('/twitter/return', passport.authenticate('twitter', {
    failureRdirect: '/'
}), function(req, res) {
    res.redirect('/');
});




//