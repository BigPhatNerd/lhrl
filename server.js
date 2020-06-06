const express = require("express");
const passport = require('passport');
var mongoose = require('mongoose');
var auth = require('./authentication.js');
var UserModel = require('./models/user.js');
var User = mongoose.model('User');
const app = express();
const session = require('express-session');
//var methodOverride = require('method-override')
const cookieSession = require('cookie-session');
const Twitter = require("./controller/TwitterFunctions/Twitter");
const cors = require("cors");


const connectDB = require('./config/db');

require('dotenv').config();
const path = require('path');
const request = require('request');
const bodyParser = require("body-parser");
const { mongo } = require('./lib/keys');
var MongoStore = require("connect-mongo")(session);
//app.use(session({ secret: "my cust0m 5E5510N k3y", saveUninitialized: true, resave: false }));

const PORT = process.env.PORT || 4390;

const cookieParser = require("cookie-parser");
const sessionCookieSecureValue = process.env.NODE_ENV == "production" ? true : false;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


connectDB();




app.use(session({
    store: new MongoStore({
        url: mongo.dbURI
    }),
    secret: 'grant',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        origin: "http://lhrlslacktest.ngrok.io",
        methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
        credentials: true
    })
);

module.exports = express;

passport.serializeUser(function(user, done) {
    console.log('PIMPIN' + user._id);
    done(null, user._id);
});


passport.deserializeUser(function(obj, done) {
    console.log('OBJ' + obj);
    done(null, obj);
});

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