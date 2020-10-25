const router = require('express').Router();
const { User } = require('../models');
const passport = require('../config/authentication');
const { slack, strava } = require('../lib/keys');
const axios = require('axios');
const config = { 'Content-Type': 'application / json' }
const url = slack.webHook;
const opn = require('opn');
const stravaToken = strava.accessToken;
const { refreshToken } = require('../controller/strava-controller');
const stravaAuth = require('../config/authentication');

const webAddress = 'https://www.strava.com/api/v3/athlete';
const {
    stravaHook,
    testSlackBlock
} = require('../slack-templates/strava-templates');
const post = { "text": "booga booga" }

//Testing a route from strava webhook 
//THIS IS BRILLIANT
router.get("/testing", async (req, res) => {

})
router.get('/find', async (req, res) => {

    const findUser = await User.findOne({ "email": req.query.email });

    res.json(findUser);
})

//Create route for STRAVA webhook
router.post('/webhook', async (req, res) => {
    try {
        console.log("Strave webhook event received!", req.query, req.body);
        const {
            aspect_type,
            object_id,
            owner_id,
            object_type
        } = req.body
        if(aspect_type === 'delete') {
            console.log(`${owner_id} deleted an activity`);
            return
        }
        //Refresh User's token:
        const accessToken = await refreshToken(owner_id);
        //GET the data of the activity from Strava
        const stravaData = await axios.get(`https://www.strava.com/api/v3/athlete/activities?per_page=1`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });
        //Destructure informationreturned from stravaData:
        const {
            type,
            athlete,
            distance,
            elapsed_time,
            start_date,
            average_temp,
            average_speed,
            max_speed,
            map
        } = stravaData.data[0];
        //Save the information to mongoose by searching for stravaId
        console.log("stravaData(inside strava webhook): ", stravaData.data[0]);
        const saveActivity = await User.findOneAndUpdate({ stravaId: owner_id }, {
            type: type,
            owner_id: athlete.id,
            distance: distance,
            elapsed_time: elapsed_time,
            start_date: start_date,
            average_temp: average_temp,
            average_speed: average_speed,
            max_speed: max_speed,
            stravaMap: map.summary_polyline
        })
        //Need to send the info back to Slack below
        //Send Slack Webhook 
        console.log("saveActivity.stravaAvatar: ", saveActivity.stravaAvatar);
        console.log("stravaHook(stravaData): ", stravaHook(stravaData.data[0]));
        const { name, stravaAvatar } = saveActivity
        axios.post(slack.webHook, stravaHook(stravaData.data[0], name, stravaAvatar), config);
        res.status(200).send("EVENT_RECEIVED");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Adds support for GET requests to STRAVA webhook
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


router.route('/loginfromslack')
    .post((req, res) => {
        //First I need to get the user requesting the login from slack and store it.

        opn('http://lhrlslacktest.ngrok.io/');
        res.send("Taking you to the Strava login page");
    });

router.get('/login', passport.authenticate('strava', {
    // scope: 'activity:read_all',
    'scope': 'activity:read_all'

}));
router.get('/redirect', passport.authenticate('strava', {
    successRedirect: 'http://localhost:3000/',
    //I need to flash a failure message if login fails.
    failureRedirect: 'http://localhost:3000/failed'
}), function(req, res) {
    console.log("req.user: ", req.user);
    console.log("response from authenticate: ", res);
});




module.exports = router;