const { slack } = require('./../lib/keys.js');
const botToken = process.env.NODE_ENV === "production" ? slack.botToken : slack.dev_botToken;
const { WebClient } = require('@slack/web-api');
const web = new WebClient(botToken, { retries: 0 });

module.exports = web;