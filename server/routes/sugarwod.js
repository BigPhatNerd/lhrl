const router = require('express').Router();
const { User } = require('../models');
const { slack, sugarwod } = require('./../lib/keys.js');
const axios = require('axios');
const config = {
    'Authorization': sugarwod.sugarwodKey
}
const slackConfig = { 'Content-Type': 'application / json' };
const webhookConfig = {
    'Authorization': 'b31411f2-0a41-4bbf-ac6b-b8154ab92e83',
    'subscriber_url': 'https://lhrlslacktest.ngrok.io/sugarwod/webhook/',
    // 'type': 'event.affiliate.ATHLETE_JOINED',
    // 'enabled': true,
    // 'webhooks_version': 0,
    // 'webhook_id': 'liftheavyrunlong'

}


const slackHeader = { 'Content-Type': 'application/json' }
const post = { "text": "booga booga" }
console.log("sugarwod.sugarwodKey: ", sugarwod.sugarwodKey);

router.post('/webhook', (req, res) => {
    console.log("sugarwod webhook received!", req.query, req.body);
    res.status(200).send('EVENT_RECEIVED');

});


router.get('/webhook', async (req, res) => {
    console.log('slack.sugarwodWebHook: ', slack.sugarwodWebhook);
    try {
        console.log("fake req.body: ", req.body);
        return axios.post(`${slack.sugarwodWebHook}`, { "text": "sugarwod is firing" }, slackConfig);
        res.status(200).send("EVENT_RECEIVED");
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

router.get('/test', async (req, res) => {
    //Eventually set this to run once a day in a setInterval function using moment.js
    try {
        const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: config });
        const { title, description, score_type } = wod.data.data[0].attributes
        console.log('wod.data.data[0].title: ', wod.data.data[0].title);
        await axios.post(slack.cf_wodWebhook, {
            "text": "🏋️‍♀️ " + title + " 🏋️‍♀️\n" +
                "💪 " + description + " 💪\n" +
                "📝 " + score_type + " 📝"
        }, slackHeader);

        res.json(wod.data)
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }

})


// const test = await axios.get('https://api.sugarwod.com/v2/box', { headers: config });
//        const athletes = await axios.get('https://api.sugarwod.com/v2/athletes', { headers: config });
//        const workouts = await axios.get('https://api.sugarwod.com/v2/athletes', { headers: config });
//        const tracks = await axios.get('https://api.sugarwod.com/v2/tracks', { headers: config });
//        const home = await axios.get('https://api.sugarwod.com/v2/home', { headers: config })
//         const resObject = {
//            test: test.data,
//            athletes: athletes.data,
//            workouts: workouts.data,
//            tracks: tracks[0].data,
//            home: home.data
//        }

module.exports = router;