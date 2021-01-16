require("dotenv").config();

module.exports = {
    slack: {
        clientID: process.env.SLACK_CLIENT_ID,
        dev_clientID: process.env.DEV_SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        dev_clientSecret: process.env.DEV_SLACK_CLIENT_SECRET,
        botToken: process.env.SLACK_BOT_TOKEN,
        dev_botToken: process.env.DEV_SLACK_BOT_TOKEN,
        stravaWebHook: process.env.STRAVA_WEBHOOK,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
        dev_signingSecret: process.env.DEV_SLACK_SIGNING_SECRET,
        sugarwodWebhook: process.env.SUGARWOD_WEBHOOK,
        cf_wodWebhook: process.env.CF_WOD_WEBHOOK,
        verificationToken: process.env.SLACK_VERIFICATION_TOKEN,
        dev_verificationToken: process.env.DEV_SLACK_VERIFICATION_TOKEN,
        fiveK_Webhook: process.env.FIVEK_WEBHOOK,
        lhrl_Webhook: process.env.LHRL_WEBHOOK,
        dev_lhrl_Webhook: process.env.DEV_LHRL_WEBHOOK

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
    sugarwod: {
        sugarwodKey: process.env.SUGARWOD_KEY
    },
    Session: {
        cookieKey: process.env.COOKIE_KEY
    },
    url: {
        development: process.env.DEV_URL,
        production: process.env.PROD_URL
    }

}

//