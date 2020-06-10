const router = require('express').Router();
const passport = require('passport');
const { slack, strava } = require('../lib/keys');
const axios = require('axios');
const config = { 'Content-Type': 'application / json' }
const url = slack.webHook;
const stravaToken = strava.accessToken;

const webAddress = 'https://www.strava.com/api/v3/athlete';

const post = { "text": "booga booga" }

router.get('/login', passport.authenticate('strava'));
router.get('/redirect', passport.authenticate('strava'), (req, res) => {
    res.redirect('https://app.slack.com/client/T012RRU3P3R/C0136HYBVFU');
});



module.exports = router;