const router = require('express').Router();
const passport = require('../config/authentication');
const { slack, strava } = require('../lib/keys');
const axios = require('axios');
const config = { 'Content-Type': 'application / json' }
const url = slack.webHook;
const opn = require('opn');
const stravaToken = strava.accessToken;
const {
    refreshToken,
    getUsers,
    stravaAttempt,

} = require('../controller/strava-controller');
const stravaAuth = require('../config/authentication');

const webAddress = 'https://www.strava.com/api/v3/athlete';
const {
    stravaHook,
    testSlackBlock
} = require('../controller/slack-templates/strava-templates');
const post = { "text": "booga booga" }

//Test webhook
// axios.post(url, testSlackBlock("TESST"), config);

router.route('/')
    .get(getUsers)
    .post(refreshToken)


//Create route for strava webhook
router.post('/webhook', async (req, res) => {
    console.log("Webhook event received!", req.query, req.body);
    res.status(200).send("EVENT_RECEIVED");
    //GET the data of the activity from Strava
    const stravaData = await axios.get(`https://www.strava.com/api/v3/activities/${req.body.object_id}`)
    //Save the information to mongoose by searching for stravaId


    //Need to send the info back to Slack below
    //Attempting Slack Webhook 
    //     axios.post(slack.webHook, { "text": stravaHook(stravaData) }, config)
});

//Adds support for GET requests to webhook
router.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = "STRAVA";
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if(mode && token) {
        if(mode === 'subscribe' && token === VERIFY_TOKEN) {
            //Responds with the challenge token from the request
            console.log("WEBHOOK RECEIVED");

            res.json({ "hub.challenge": challenge });
        } else {
            res.sendStatus(403);
        }
    }
})




router.route("/stravattempt")
    .get(stravaAttempt)

router.route('/loginfromslack')
    .post((req, res) => {
        //First I need to get the user requesting the login from slack and store it.
        opn('http://lhrlslacktest.ngrok.io/strava/login');
        res.send("Taking you to the Strava login page");
    });

router.get('/login', passport.authenticate('strava', {

    scope: ['read_all'],
    profile: ['read_all'],
    activity: ['read_all']
    // scope: ['read'],
    // profile: ['read'],
    // activity: ['read']
}));
router.get('/redirect', passport.authenticate('strava', {
    successRedirect: '../views/',
    failureRedirect: '../views/'
}), (req, res) => {
    console.log("req: ", req.user);
    console.log("res: ", res.user);
});

router.get('/test', function(req, res) {
    console.log("req.user", req.user);;
    res.json(req.user);
});

module.exports = router;

// (req, res) => {
//I am right here after clicking 'authorize' on Strava page.
//Need to call POST to https://www.strava.com/oauth/token
// console.log("REQQQQQ: (consuming) ", req.query.code);
// console.log("REQ.query.scope: ", req.query.scope);

// axios.post("https://www.strava.com/api/v3/oauth/token?", {
//     "client_id": "48507",
//     "client_secret": "2ea55c3614e8a7717f5ec8ef4cdbc0811b248d3f",
//     "code": req.query.code,
//     "grant_type": "authorization_code"
// }).then(response => {
//     console.log("made it here");
//     res.json(response.data)
// }).catch(err => {
//     console.log(err);
// })

// res.redirect('https://app.slack.com/client/T012RRU3P3R/C0136HYBVFU');
// });