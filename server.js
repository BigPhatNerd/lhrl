require('dotenv').config();
const express = require("express");

var mongoose = require('mongoose');
var passport = require('./config/authentication.js');
var UserModel = require('./models/User.js');
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

mongoose.set('debug', true);
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = slack.signingSecret;
const slackInteractions = createMessageAdapter(slackSigningSecret);
app.use('/slack/actions', slackInteractions.requestListener());
exports.slackInteractions = slackInteractions;



var MongoStore = require("connect-mongo")(session);

const cookieParser = require("cookie-parser");
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(session({
    store: new MongoStore({
        url: mongo.dbURI
    }),
    secret: "my cust0m 5E5510N k3y",
    saveUninitialized: true,
    resave: true
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header('credentials', 'same-origin');
    console.log("req.session: ", req.sessionID);
    if('OPTIONS' == req.method) {
        res.send(200);
    } else {
        req.user = req.session.user;
        next();
    }
});


const PORT = process.env.PORT || 4390;

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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://lhrlslacktest.ngrok.io");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);

});

app.get('/', (req, res) => {
    // res.send("Ngrok is working! Path Hit: " + req.url);
    res.sendFile(path.join(__dirname + '/public/views/index.html'));

});


module.exports = express










//