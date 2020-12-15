const moreSlackInteractions = require('./../../config/slack-interactions.js');
var CronJob = require('cron').CronJob;


//Basically from "Today's Workout" down on homepage



module.exports = {
    middleware: moreSlackInteractions.expressMiddleware()
}