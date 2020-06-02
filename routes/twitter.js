const router = require('express').Router();
const passport = require('passport');
const opn = require('opn');
const { twitterMyStatus } = require('../controller/TwitterFunctions/Twitter');
const axios = require('axios');
const { slack } = require('../lib/keys')
const config = { 'Content-Type': 'application / json' }
const { User } = require('../models');

const url = slack.webHook;
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
});


router.get('/login', passport.authenticate('twitter'));

router.get("/", (req, res) => {

    res.send('congrats');
})

router.get('/redirect', passport.authenticate('twitter'), (req, res) => {
    res.send(req.username);
    res.redirect('https://app.slack.com/client/T012RRU3P3R/C0136HYBVFU');
    console.log(res);
})




router.post('/', async (req, res) => {
    const input = req.body.text;

    await axios.post(url, {
        "text": "Fetching Twitter Data"
    }, config);
    const twitterStatus = await twitterMyStatus(input)

    await axios.post(url, {
        text: twitterStatus,
        attachments: '',

    }, config);

    // res.send((req.body.response_url, { "text": "Fetching Garmin Data" }))
    // twitterMyStatus()
    res.sendStatus(200);
});


// const twitterStatus = twitterMyStatus()



// axios.post(url, {
//     mkdwn: true,
//     text: 'twitterStatus',
//     attachments: ''
// }, config)



//opn('http://982bd44f.ngrok.io/twitter/login', passport.authenticate('twitter'));
//axios.get('http://982bd44f.ngrok.io/twitter/login', passport.authenticate('twitter'));

// axios.get('http://982bd44f.ngrok.io/twitter/login', passport.authenticate('twitter')).then(response => {

//     console.log('Holy moly on the first part');
//     opn('https://api.twitter.com/' + response.request.path);
//     axios.get('slack://slack.com/app_redirect?app=A0132K3RRHC', passport.authenticate('twitter')).then(response => {
//         console.log('made it?')
//     })

// }).catch((e) => console.log(e));












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