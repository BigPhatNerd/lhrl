require("dotenv").config();

module.exports = {
    slack: {
        clientID: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        botToken: process.env.SLACK_BOT_TOKEN,
        webHook: process.env.WEBHOOK,
    },
    mongo: {
        dbURI: process.env.MONGODB_URI,
    },
    strava: {
        accessToken: process.env.STRAVA_ACCESS_TOKEN,
    }
}