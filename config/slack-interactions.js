const { slack } = require('./../lib/keys.js');
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackSigningSecret = slack.signingSecret;
module.exports = createMessageAdapter(slackSigningSecret);