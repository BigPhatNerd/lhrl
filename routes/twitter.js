const router = require('express').Router();
const passport = require('passport');
const opn = require('opn');

const axios = require('axios');
const { slack } = require('../lib/keys')
const config = { 'Content-Type': 'application / json' }
const { User } = require('../models');

const url = slack.webHook;
const nyTimesKey = process.env.NYTIMES_KEY;
const webAddress = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=' + nyTimesKey;

const post = { "text": "booga booga" }



router.route('/yo').post((req, res) => res.send('Word to your momma'));

router.route('/')
    .post((req, res) => {
        const input = req.body.text;
        res.send((req.body.response_url, { "text": "Fetching Garmin Data" }));
        axios.get('http://982bd44f.ngrok.io/twitter/login', passport.authenticate('twitter')).then(response => {

            opn('https://api.twitter.com/' + response.request.path);
            // 6CQ8cwAAAAABEsGUAAABcleQXr4

        }).catch((e) => console.log(e));






    })





// axios.get(webAddress).then(response => {
//         axios.post(url, {
//             mkdwn: true,
//             text: "Yo Garmin!",

//             attachments: ''
//         }, config).catch((e) => console.log(e))


//     }).catch((e) => console.log(e))

// axios.get('http://982bd44f.ngrok.io/twitter/return', passport.authenticate('twitter', {
//                 failureRdirect: '/'
//             }), (req, res) => {

//                 console.log(res);
//                 res.redirect('/');
//             });
// axios.get('https://api.twitter.com/oauth/authorize', passport.authenticate('twitter')).catch((e) => console.log(e))


module.exports = router;