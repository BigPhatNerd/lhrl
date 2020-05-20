const router = require('express').Router();
const axios = require('axios');
const config = { 'Content-Type': 'application / json' }

const url = process.env.GARMIN_WEBHOOK;

const post = { "text": "booga booga" }

router.route('/')
    .post((req, res) => {
        res.json(test());
    })


function test() {
    axios.post(url, post, config)
}


module.exports = router;