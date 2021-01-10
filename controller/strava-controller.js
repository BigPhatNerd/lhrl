const axios = require("axios");
const { User } = require('../models');
const passport = require('passport');
const { strava } = require('../lib/keys');


const { clientId, clientSecret } = strava;

const stravaController = {
    async refreshToken(response) {
        try {
            console.log("RESPONSE IN STRAVA CONTROLLER: ", response)
            const user = await User.findOne({ stravaId: response });
            const stravaRefresh = await axios.post("https://www.strava.com/api/v3/oauth/token", {
                "client_id": clientId,
                "client_secret": clientSecret,
                "grant_type": "refresh_token",
                "refresh_token": user.stravaRefreshToken
            });

            const { access_token, refresh_token, expires_at, expires_in } = stravaRefresh.data;
            const updateUser = await User.findOneAndUpdate({ stravaId: response }, {
                stravaAccessToken: access_token,
                stravaRefreshToken: refresh_token,
                expires_at: expires_at,
                expires_in: expires_in
            }, { returnOriginal: false })

            console.log("User autheticated and updated!");

            //I THINK I return updateUser to have access to updateUser.accessToken?
            console.log("access_token: ", access_token);
            return access_token
        } catch (err) {

            console.error(err.message);
            console.log("Error in the refreshToken() function")
        }


    }
}



// const newUser = new User({
//     stravaId: "filter test (should not be here)",
//     provider: "strava",
//     displayName: "Another Test user",
//     name: "Another" + " " + "User",
//     stravaAvatar: "Some avatar",
//     emails: { value: "nothing" },
//     created: Date.now(),
//     modified: Date.now(),
//     stravaAccessToken: "123456",
//     stravaRefreshToken: "789123",
//     expires_at: Date.now() + 261600
// })
// newUser.save();
// stravaController.stravaRefresh();
//stravaController.refreshToken()
//Sets strava refresh to run every 5 hours
//setInterval(stravaController.refreshToken(), 18000000);
//stravaController.stravaAttempt();



module.exports = stravaController;