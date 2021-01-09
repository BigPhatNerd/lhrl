const router = require('express').Router();

const { slack } = require('../lib/keys');
const request = require('request');
const { url } = require('../../../lib/keys');
const urlString = process.env.NODE_ENV === "production" ? url.production : url.development


router.route("/")
    .get((req, res) => {

        if(!req.query.code) {
            res.status(500);
            res.send({ "Error": "Looks like we're not getting code." });
            console.log("Looks like we are not getting code.");
        } else {
            request({
                url: 'https://slack.com/api/oauth.v2.access',
                qs: { code: req.query.code, client_id: slack.clientID, client_secret: slack.clientSecret, redirect_uri: `${urlString}/oauth/` },
                method: 'GET',
            }, function(error, response, body) {
                console.log("\n\nbody: ", body);
                if(error) {
                    console.log(error);
                } else {
                    console.log(body);
                    res.json(body);
                }
            })
        }
    })

module.exports = router;