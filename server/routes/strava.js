const router = require('express').Router();
const { User, Strava, Session, FinishedWorkout } = require('../models');
const passport = require('../config/authentication');
const { slack, strava } = require('../lib/keys');
const axios = require('axios');
const config = { 'Content-Type': 'application/json' }
const url = slack.webHook;
const open = require('open');
const stravaToken = strava.accessToken;
const { refreshToken } = require('../controller/strava-controller');
const stravaAuth = require('../config/authentication');
const passUser = require('../config/middleware/passUser');

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
});

//deauthorize strava by removing access and refresh tokens
router.put('/deauth/:stravaId', async (req, res) => {
    console.log("req.params.stravaId: ", req.params.stravaId);
    const stravaId = req.params.stravaId;
    const update = {
        stravaAccessToken: '',
        stravaRefreshToken: '',
        authorizeStrava: false
    }
    let user = await User.findOneAndUpdate(stravaId, update, {
        new: true
    });
    res.json(user)
})

//Create route for STRAVA webhook to go to Slack
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
        const body = {
            type: type,
            owner_id: athlete.id,
            distance: distance,
            elapsed_time: elapsed_time,
            start_date: start_date,
            average_temp: average_temp,
            average_speed: average_speed,
            max_speed: max_speed,
            stravaMap: map.summary_polyline
        };
        Strava.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ stravaId: owner_id }, { $addToSet: { stravaWorkouts: _id } }, { new: true })
            })
            .then(activityData => {
                if(!stravaData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return
                }
                //Need to send the info back to Slack below
                //Send Slack Webhook

                const { name, stravaAvatar } = activityData;

                axios.post(slack.lhrl_Webhook, stravaHook(stravaData.data[0], name, stravaAvatar), config);

            })

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
    .post(async (req, res) => {
        try {
            //First I need to get the user requesting the login from slack and store it.
            console.log("\n\nIs this the error?\n\n");

            const { team_id, user_id, user_name, api_app_id } = req.body;
            console.log("\n\n\n\nreq.body: ", req.body);

            console.log
            req.session.userId = user_id;



            const deleteSessions = await Session.deleteMany({});
            const createSession = await Session.create({ userId: user_id, team_id: team_id, api_app_id: api_app_id });
            const createUser = await User.findOneAndUpdate({ team_id: team_id }, { $set: { user_id: user_id, user_name: user_name } }, { upsert: true, new: true });


            open('http://lhrlslacktest.ngrok.io/strava/login');
            res.send("Taking you to the Strava login page");

            return createUser
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });


router.get('/login', passport.authenticate('strava', {
    'scope': 'activity:read_all'
}));

router.get('/redirect', passport.authenticate('strava'), async (req, res) => {
    console.log("DID I MAKE THIS");
    const session = await Session.find({});
    console.log('\n\n\n\nsession: ', session);
    const { team_id, api_app_id } = session[0];

    // res.redirect(`slack://app?team=${team_id}&id=${api_app_id}&tab=home`)
    res.redirect(`slack://app?team=${team_id}&id=${api_app_id}&tab=about`)
    // res.send("Slack successfully authorized")
    // res.redirect(`slack://app?team=${team_id}`) 
    // res.redirect('back');
    // res.redirect(`https://slack.com/app_redirect?channel=${team_id}`)

    return
    //I need to flash a failure message if login fails.

});

// router.get('/redirect', async (req, res) => {
//     const getSession = await Session.find({});
//     const { team_id, api_app_id } = getSession[0];
//     res.redirect(`slack://app?team=${team_id}&id=${api_app_id}&tab=home`);
// });




module.exports = router;