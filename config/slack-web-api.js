// const { slack } = require('./../lib/keys.js');
// const botToken = process.env.NODE_ENV === "production" ? slack.botToken : slack.dev_botToken;
const { WebClient, LogLevel } = require('@slack/web-api');



const web = (token) => {
    const getToken =
        new WebClient(token, {
            logLevel: LogLevel.DEBUG,
            retries: 0
        });
        
    return getToken
}

module.exports = web

// const web = new WebClient(botToken, {
//     logLevel: LogLevel.DEBUG,
//     retries: 0
// });



// module.exports = web;