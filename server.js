require('dotenv').config();
const express = require("express");
const passport = require('passport');
var mongoose = require('mongoose');
var auth = require('./authentication.js');
var UserModel = require('./models/user.js');
var User = mongoose.model('User');
const app = express();
const session = require('express-session');
const path = require('path');
const request = require('request');
const bodyParser = require("body-parser");
const { mongo, slack } = require('./lib/keys');
const cookieSession = require('cookie-session');
const cors = require("cors");
const connectDB = require('./config/db');
process.env.NODE_DEBUG = 'request'


const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = slack.signingSecret;
const slackInteractions = createMessageAdapter(slackSigningSecret);
app.use('/slack/actions', slackInteractions.requestListener());
exports.slackInteractions = slackInteractions;



var MongoStore = require("connect-mongo")(session);

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(session({
    store: new MongoStore({
        url: mongo.dbURI
    }),
    secret: "my cust0m 5E5510N k3y",
    saveUninitialized: true,
    resave: false
}));

const PORT = process.env.PORT || 4390;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
connectDB();

app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        origin: "http://lhrlslacktest.ngrok.io",
        methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
        credentials: true
    })
);


passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(null, user);
    });
});

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);

});

app.get('/', (req, res) => {
    // res.send("Ngrok is working! Path Hit: " + req.url);
    res.sendFile(__dirname + '/views/index.html');
});


module.exports = express










//