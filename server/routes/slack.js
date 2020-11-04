const router = require('express').Router();
const axios = require('axios');
const {
    testButtons,
    modal
} = require('./../controller/slack-controller.js');
const createWorkout = require('./../controller/forms/createWorkout.js');
const { slack } = require('./../lib/keys.js');
const { botToken, verificationToken, } = slack;
// const { WebClient } = require('@slack/web-api');
// const web = new WebClient(botToken, { retries: 0 });
const web = require('./../config/slack-web-api.js');



router.post('/play', async (req, res) => {
    const { token, trigger_id, } = req.body;

    try {
        res.status(200).send('');
        const modal = {
            // token: token,
            trigger_id: trigger_id,
            view: {
                "type": "modal",
                "callback_id": "create_form",
                "title": {

                    "type": "plain_text",
                    "text": "My App",
                    "emoji": true
                },
                "submit": {
                    "type": "plain_text",
                    "text": "Enter Workout",
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
                        "type": "mrkdwn",
                        "text": "A message *with some bold text* and _some italicized text_."
                    }
                }]
            }
        }
        await web.views.open(modal);

    } catch (err) {
        console.error(err.message);

    }
})

router.post('/create-workout', async (req, res) => {
    console.log("I am being hit after modal!!! ")
    const { token, trigger_id, } = req.body;
    try {
        res.status(200).send('');
        await web.views.open(createWorkout(trigger_id));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
router.post('/slash-commands/send-me-buttons', (req, res) => {

})

router.post('/external-data', (req, res) => {
    res.send("I think someone is typing on my app.")
})

module.exports = router;


//