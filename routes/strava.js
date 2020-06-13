const router = require('express').Router();
const passport = require('passport');
const { slack, strava } = require('../lib/keys');
const axios = require('axios');
const config = { 'Content-Type': 'application / json' }
const url = slack.webHook;
const opn = require('opn');
const stravaToken = strava.accessToken;

const webAddress = 'https://www.strava.com/api/v3/athlete';

const post = { "text": "booga booga" }
router.route('/loginfromslack')
    .post((req, res) => {
        opn('http://lhrlslacktest.ngrok.io/strava/login');
        res.send("Taking you to the Strava login page");
    });

router.get('/login', passport.authenticate('strava', {
    scope: ['read_all'],
    profile: ['read_all'],
    activity: ['read_all']
}));
router.get('/redirect', passport.authenticate('strava'), (req, res) => {
    res.redirect('https://app.slack.com/client/T012RRU3P3R/C0136HYBVFU');
});



module.exports = router;