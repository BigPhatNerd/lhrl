const router = require('express').Router();
const axios = require('axios');
const { slack } = require('../lib/keys')
const config = { 'Content-Type': 'application / json' }

const url = slack.webHook;
const nyTimesKey = process.env.NYTIMES_KEY;
const webAddress = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=' + nyTimesKey;

const post = { "text": "booga booga" }

router.route('/')
    .post((req, res) => {
        const input = req.body.text;
        res.send((req.body.response_url, { "text": "Fetching Garmin Data" }));
        axios.get(webAddress).then(response => {

            axios.post(url, {
                mkdwn: true,
                text: "Yo Garmin!",

                attachments: ''
            }, config).catch((e) => console.log(e))

        }).catch((e) => console.log(e))
    })



module.exports = router;