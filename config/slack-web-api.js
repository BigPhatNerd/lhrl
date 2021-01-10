const { slack } = require('./../lib/keys.js');
const { botToken } = slack;
const { WebClient } = require('@slack/web-api');
const web = new WebClient(botToken, { retries: 0 });

module.exports = web;