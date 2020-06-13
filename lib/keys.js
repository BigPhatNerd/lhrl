require("dotenv").config();

module.exports = {
    slack: {
        clientID: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        botToken: process.env.SLACK_BOT_TOKEN,
        webHook: process.env.WEBHOOK,
        signingSecret: process.env.SLACK_SIGNING_SECRET

    },
    mongo: {
        dbURI: process.env.MONGODB_URI,
    },
    strava: {
        clientId: process.env.STRAVA_CLIENT_ID,
        clientSecret: process.env.STRAVA_CLIENT_SECRET,
        accessToken: process.env.STRAVA_ACCESS_TOKEN,
        refreshToken: process.env.STRAVA_REFRESH_TOKEN,
        clubId: process.env.STRAVA_CLUB_ID

    },

    Session: {
        cookieKey: process.env.COOKIE_KEY
    }

}

//