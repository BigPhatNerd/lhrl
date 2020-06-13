const router = require('express').Router();
const request = require("request");
const slackTest = require('../server');
const axios = require('axios');
const { WebClient, LogLevel } = require('@slack/web-api');
const { strava, slack } = require('../lib/keys');

const url = slack.webHook;
const stravaToken = strava.accessToken;
const slackToken = slack.botToken;
const getAthlete = 'https://www.strava.com/api/v3/athlete';
const clubId = strava.clubId;
const clubActivities = `https://www.strava.com/api/v3/clubs/${clubId}/activities?per_page=30`;

const listActivities = "https://www.strava.com/api/v3/athlete/activities?per_page=5";
const slackView = "https://slack.com/api/views.open"
const stravaHeaders = { headers: { Authorization: `Bearer ${stravaToken}` } };
const slackHeaders = { headers: { Authorization: `Bearer ${slackToken}` } }
const web = new WebClient(slackToken, { logLevel: LogLevel.DEBUG });

slackTest.slackInteractions.action({ type: 'view_submission' }, (payload, respond) => {
    console.log("What's up bitches!!!");
    // axios.get(listActivities, stravaHeaders)
    //   .then((response) => {
    //       console.log(response);
    //   }).catch((e) => {
    //       console.log("Error is: ", e);
    //   })


})
const stravaResponse = (first, last) => {
    const responseBlock = {
        "blocks": [{
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": first + ' ' + last
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Go to Strava",
                    "emoji": true
                },
                "value": "click_me_123"
            }
        }]
    }
    return responseBlock
}



const modalOpen = (trigger_id) => {
    const block = {
        "trigger_id": trigger_id,
        "view": {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "My App",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [{
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": "Let go get some Strava Activities.",
                    "emoji": true
                }
            }]
        }
    }
    return block
}

const testBlockWithCat = (name, first, last, elapsedTime) => {
    const block = {
        "blocks": [{
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": first + " " + last + "\n" + "Workout name: " + name
                },
                "accessory": {
                    "type": "image",
                    "image_url": "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg",
                    "alt_text": "cute cat"
                }
            },
            {
                "type": "divider"
            }
        ]
    }
    return block
}



router.post('/play', (req, res) => {
    //List Athlete's Activities
    axios.get(clubActivities, stravaHeaders)
        .then((response) => {
            const data = response.data;
            console.log(data);
            // var bunchOfBlocks = data.forEach((e) => { testBlockWithCat(e.name, e.firstName, e.lastName, e.elapsedTime) })
 // console.log(bunchOfBlocks);


            // console.log("This is data: ", response.data[0])
            // axios.post(url, bunchOfBlocks)
            //     .catch((e) => console.log(e));

        })
        .catch((error) => {
            console.log(error);
        })
    res.sendStatus(200);

})

module.exports = router;
//Slack Interaction button click
//slackTest.slackInteractions.action({ type: 'submit', value: "click_me_123" }


//Get the athlete from strava
// router.post('/play', (req, res) => {
//     
//     axios.get(getAthlete, stravaHeaders)
//         .then((response) => {
//             const data = response.data;
//             axios.post(url, stravaResponse(data.firstname, data.lastname))
//                 .catch((e) => console.log(e));

//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     res.sendStatus(200);

// })

//GET ACTIVITIES BY ATHLETE BUT NEEDS BROADER SCOPE
// router.post('/play', (req, res) => {
//     //List Athlete's Activities
//     axios.get(listActivities, stravaHeaders)
//         .then((response) => {
//             const data = response.data;
//             console.log("This is data: ", data[0])
//             axios.post(url, stravaResponse(data[0].name, data[0].type))
//                 .catch((e) => console.log(e));

//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     res.sendStatus(200);

// })



//OPENS A MODAL
// router.post('/play', (req, res) => {
//     const data = req.body;
//     web.views.open(modalOpen(data.trigger_id))
//     console.log("RESPONSE " + res);
//     res.sendStatus(200);

//     //res.send(modalOpen(data.trigger_id));

// })






//