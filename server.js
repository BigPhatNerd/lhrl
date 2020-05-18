const express = require("express");
require('dotenv').config();
const request = require('request');
const app = express();
const PORT = process.env.PORT || 4390;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);

});

app.get('/', (req, res) => {
    res.send("Ngrok is working! Path Hit: " + req.url);
});

/* app.get('/', function(req, res) {
    res.send("Ngrok is working! Path Hit: " + req.url);
});
app.get("/oauth", (req, res) => {
    if (!req.query.code) {
        res.status(500);
        res.send({ "Error": "Looks like we're not getting code." });
        console.log("Looks like we are not getting code.");
    } else {
        request({
            url: 'https://slack.com/api/oauth.v2.access',
            qs: { code: req.query.code, client_id: slack.clientID, client_secret: slack.clientSecret, redirect_uri: "http://da77515d.ngrok.io/oauth/" },
            method: 'GET',
        }, function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                console.log(body);
                res.json(body);
            }
        })
    }
})

app.post('/command', (req, res) => {
    res.send("Your ngrok tunnel is up and running");
});
*/




//