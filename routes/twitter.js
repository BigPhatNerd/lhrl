const router = require('express').Router();
const passport = require('passport');
const opn = require('opn');
const { twitter } = require('../controller/TwitterFunctions/Twitter');
const { twitterStuff } = require('../controller/LearningForms/learningForms');
const axios = require('axios');
const { slack } = require('../lib/keys')
const config = { 'Content-Type': 'application / json' };



const url = slack.webHook;
//Login to Twitter using the '/login' command
router.route('/loginfromslack')
    .post((req, res) => {
        opn('http://lhrlslacktest.ngrok.io/twitter/login');
        res.send("Taking you to the Twitter login page");
    });


// First step in the Oauth process.
router.get('/login', passport.authenticate('twitter'));

router.get("/", (req, res) => {
    res.send('congrats');
})

router.get('/redirect', passport.authenticate('twitter'), (req, res) => {
    res.redirect('https://app.slack.com/client/T012RRU3P3R/C0136HYBVFU');
});

router.post('/', async (req, res) => {
    const input = req.body.text;
    await axios.post(url, { "text": "Fetching Twitter Data" }, config);
    const twitterStatus = await twitter.twitterMyStatus(input)
    await axios.post(url, {
        text: twitterStatus,
        attachments: '',
    }, config);
    res.sendStatus(200);
});

router.post('/play', async (req, res) => {
    const test = await twitterStuff.wannaSeeGarmin()
    res.send(test);
});

router.post('/button_test', (req, res) => {
    res.send('someone pressed a button');
})


module.exports = router;