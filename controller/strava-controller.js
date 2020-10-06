const axios = require("axios");
const { User } = require('../models');
const passport = require('passport');
const { strava } = require('../lib/keys');


const { clientId, clientSecret } = strava;


const stravaController = {
    getUsers(req, res) {

        // User.find({})
        //     .then(dbUserData => res.json(dbUserData))
        //     .catch(err => {
        //         console.log(err);
        //         res.status(500).json(err);
        //     });

    },
    async refreshToken(req, res) {
        try {
            const user = await User.findOne({ name: "Wilson  Horrell" });
            const stravaRefresh = await axios.post("https://www.strava.com/api/v3/oauth/token", {
                "client_id": clientId,
                "client_secret": clientSecret,
                "grant_type": "refresh_token",
                "refresh_token": user.stravaRefreshToken
            });
            const { access_token, refresh_token, expires_at } = stravaRefresh.data;
            const updateUser = await User.findOneAndUpdate({ name: "Wilson  Horrell" }, {
                stravaAccessToken: access_token,
                stravaRefreshToken: refresh_token,
                expires_at: expires_at,

            }, { returnOriginal: false });
            res.json(updateUser);
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },

    stravaAttempt() {
        console.log("Running function to update refresh coin");
        User.findOne({ name: "Wilson  Horrell" })
            .then(user => {
                axios.get("https://www.strava.com/api/v3/athlete", {
                        headers: {
                            Authorization: 'Bearer ' + user.stravaAccessToken
                        }
                    })
                    .then(response => {
                        console.log("strava response: ", response.data);
                    }).catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

}

// const newUser = new User({
            //     stravaId: "123456",
            //     provider: "strava",
            //     displayName: "Test user",
            //     name: "Test" + " " + "User",
            //     stravaAvatar: "Some avatar",
            //     emails: { value: "nothing" },
            //     created: Date.now(),
            //     modified: Date.now(),
            //     stravaAccessToken: "123456",
            //     stravaRefreshToken: "789123",
            //     expires_at: Date.now() + 261600
            // })
            // newUser.save();

//stravaController.refreshToken()
//Sets strava refresh to run every 5 hours
//setInterval(stravaController.refreshToken(), 18000000);
//stravaController.stravaAttempt();



module.exports = stravaController;