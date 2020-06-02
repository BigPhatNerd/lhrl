const router = require('express').Router();
const passport = require('passport');
const opn = require('opn');
const axios = require('axios');
const { slack } = require('../lib/keys')
const config = { 'Content-Type': 'application / json' }
const { User } = require('../models');
const signature_base_string = require("../config/garmin-passport-setup");

const url = slack.webHook;
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    } else {
        res.json({ message: "user not logged in" });
    }
});


router.get('/login', passport.authenticate('oauth'));

router.get("/", (req, res) => {

    res.send('congrats');
})

router.get('/redirect', passport.authenticate('oauth'), (req, res) => {
    res.send(req.username);
    res.redirect('https://app.slack.com/client/T012RRU3P3R/C0136HYBVFU');
    console.log(res);
})



router.route('/')
    .post((req, res) => {
        res.send("Flexing some of dat Garmin muscle!");
    });


module.exports = router;