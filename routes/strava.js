const router = require('express').Router();
const { slack, strava } = require('../lib/keys');
const axios = require('axios');
const config = { 'Content-Type': 'application / json' }
const url = slack.webHook;
const stravaToken = strava.accessToken;

const webAddress = 'https://www.strava.com/api/v3/athlete';

const post = { "text": "booga booga" }

router.route('/')

    .post((req, res) => {

        res.send((req.body.response_url, { "text": "Fetching Strava Data" }));
        axios.get(webAddress, { headers: { Authorization: `Bearer ${stravaToken}` } }, ).then(response => {
            const info = response.data;
            axios.post(url, {
                mkdwn: true,
                text: info.firstname + ' ' + info.lastname,
                attachments: ''
            }, config).catch((e) => console.log(e))

        }).catch((e) => console.log(e))
    })

module.exports = router;