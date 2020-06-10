const router = require('express').Router();
const passport = require('passport');
const opn = require('opn');
const axios = require('axios');
const { slack } = require('../lib/keys')
const config = { 'Content-Type': 'application / json' }



const url = slack.webHook;

router.route('/loginfromslack')
    .post((req, res) => {
        opn('http://lhrlslacktest.ngrok.io/garmin/login');
        res.send("Taking you to the Garmin login page");
    });
router.get('/login', passport.authenticate('oauth'));

router.get("/", (req, res) => {

    res.send('congrats');
})

router.get('/redirect', passport.authenticate('oauth'), (req, res) => {

    res.redirect('https://app.slack.com/client/T012RRU3P3R/C0136HYBVFU');

})



router.route('/')
    .post((req, res) => {
        res.send("Flexing some of dat Garmin muscle!");
    });


module.exports = router;