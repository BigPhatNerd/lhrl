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
const routes = (require('./routes'));
const programRoutes = require('./routes/programs');
const weeklyGoals = require('./routes/weeklyGoals');
const homeviewRoutes = require('./routes/homeviewRoutes');
const finishedWorkouts = require('./routes/finishedWorkouts');
const goalReps = require('./routes/goalReps');
const getEverything = require('./routes/getEverything');
process.env.NODE_DEBUG = 'request';
const slackInteractions = require('./controller/message-handlers/slack-interactions.js')
const moreSlackInteractions = require('./controller/message-handlers/more-slack-interactions.js');


mongoose.set('debug', true);

app.use('/slack/actions', [slackInteractions.middleware, moreSlackInteractions.middleware]);



var MongoStore = require("connect-mongo")(session);

const cookieParser = require("cookie-parser");
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use(session({
    store: new MongoStore({
        url: mongo.dbURI,
        collection: 'sessions'
    }),
    secret: "my cust0m 5E5510N k3y",
    saveUninitialized: false,
    resave: false
}));


const PORT = process.env.PORT || 4390;

connectDB();

app.use(passport.initialize());
// app.use(passport.session());
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
require("./routes/api-routes.js")(app);
app.use('/', routes);
app.use('/programs', programRoutes);
app.use('/weeklyGoals', weeklyGoals);
app.use('/finishedWorkouts', finishedWorkouts);
app.use('/getEverything', getEverything);
app.use('/homeview', homeviewRoutes);
app.use('/goalReps', goalReps);

app.get('/', (req, res) => res.json({ msg: "Welcome to the Lift Heavy Run Long® API" }));
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);

});

module.exports = express










//