const { slack } = require('./../lib/keys.js');
const botToken = process.env.NODE_ENV === "production" ? slack.botToken : slack.dev_botToken;
const { WebClient } = require('@slack/web-api');
const web = new WebClient(botToken, { retries: 0 });
// (async () => {
//     console.log("\n\n\n\n\nWHATTTTTTT")
//     await web.auth.test();

//     console.log('\n\n\nDone!\n\n\n');
// })();

module.exports = web;