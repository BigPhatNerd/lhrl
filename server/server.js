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
const { mongo, slack } = require('./lib/keys');
const cookieSession = require('cookie-session');
const cors = require("cors");
const connectDB = require('./config/db');
const routes = (require('./routes'))
process.env.NODE_DEBUG = 'request';
const slackInteractions = require('./controller/message-handlers/slack-interactions.js')


// ///Figure this out and the export in slack routes!!!!
// const slackInteractions = require('./routes/slack.js');
//DEBUG=@slack/interactive-messages:* nodemon server.js

mongoose.set('debug', true);
// const { createMessageAdapter } = require('@slack/interactive-messages');
// const slackSigningSecret = slack.signingSecret;
// const slackInteractions = createMessageAdapter(slackSigningSecret);
// app.use('/slack/actions', slackInteractions.requestListener());
// exports.slackInteractions = slackInteractions;

app.use('/slack/actions', slackInteractions.middleware);

// slackInteractions.action({ actionId: 'actionId-0' }, async (payload) => {
//     try {
//         console.log("button click recieved", payload)
//     } catch (e) {
//         console.log("errors: ", e)
//     }

// })

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

app.use('/', routes);
app.get('/', (req, res) => res.json({ msg: "Welcome to the Lift Heavy Run Long® API" }));
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);

});

module.exports = express










//