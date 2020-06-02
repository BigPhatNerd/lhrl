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
        accessToken: process.env.STRAVA_ACCESS_TOKEN,
    },
    twitter: {
        apiKey: process.env.TWITTER_API_KEY,
        apiSecretKey: process.env.TWITTER_API_SECRET_KEY,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        secretToken: process.env.TWITTER_ACCESS_TOKEN_SECRET

    },
    Session: {
        cookieKey: process.env.COOKIE_KEY
    },
    garmin: {
        apiKey: process.env.GARMIN_CONSUMER_KEY,
        apiSecretKey: process.env.GARMIN_SECRET_KEY
    }
}

//