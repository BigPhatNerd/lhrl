const express = require("express");
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const Twitter = require("./controller/TwitterFunctions/Twitter");
const db = require('./models');

const connectDB = require('./config/db');

require('dotenv').config();

const twitterPassportSetup = require('./config/twitter-passport-setup');
const garminPassportSetup = require('./config/garmin-passport-setup');
const { twitter, garmin, Session } = require('./lib/keys');
const path = require('path');
const request = require('request');
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4390;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessionCookieSecureValue = process.env.NODE_ENV == "production" ? true : false;
const opn = require('opn');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: Session.cookieKey, resave: false, saveUninitialized: true }));



connectDB();

app.use(
    session({
        secret: 'what the furck',
        key: 'dunno',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        origin: "http://localhost:4390",
        methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
        credentials: true
    })
);
app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);

});

app.get('/', (req, res) => {
    // res.send("Ngrok is working! Path Hit: " + req.url);
    res.sendFile(__dirname + '/views/index.html');
});





//app.get('/auth/twitter/callback', (req, res) => (res.send("Maybe we are getting somewhere?: " + req.url)));





//