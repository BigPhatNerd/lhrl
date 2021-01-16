const { slack } = require('./../lib/keys.js');
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = process.env.NODE_ENV === "production" ? slack.signingSecret : slack.dev_signingSecret;
console.log(slackSigningSecret);
module.exports = createMessageAdapter(slackSigningSecret);