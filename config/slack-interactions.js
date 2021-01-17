const { slack } = require('./../lib/keys.js');
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.NODE_ENV === "production" ? slack.signingSecret : slack.dev_signingSecret;
console.log("\n\n\nslackSigningSecret: \n\n\n", slackSigningSecret);
module.exports = createMessageAdapter(slackSigningSecret);