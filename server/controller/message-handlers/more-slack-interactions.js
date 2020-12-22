const moreSlackInteractions = require('./../../config/slack-interactions.js');
var CronJob = require('cron').CronJob;
const web = require('../../config/slack-web-api.js');
const homepage = require('../homepage/homeview.js');
const { User, Workout, Program, FinishedWorkout } = require('../../models/');
const { createGoalsMessage } = require('./helpers');
const { slack } = require('../../lib/keys');
const sendGraphView = require('./helpers/sendGraphView');

const axios = require('axios');
const config = { 'Content-Type': 'application/json' }

var viewId;
var value;
// axios.post(slack.lhrl_Webhook, { "blocks": sendGraphView() }, config);
console.log("\n\ntesting\n\n")
//Basically from "Today's Workout" down on homepage
moreSlackInteractions.viewSubmission('add_reps_to_goals', async (payload, respond) => {
    try {
        const username = payload.user.username;
        var { pushups, situps, squats, miles } = payload.view.state.values;
        pushups = pushups.pushups.value;
        situps = situps.situps.value;
        squats = squats.squats.value;
        miles = miles.miles.value;
        const data = {
            userId: username,
            pushups: parseInt(pushups),
            situps: parseInt(situps),
            squats: parseInt(squats),
            miles: parseInt(miles)
        }
        const sendWorkout = axios.post(`http://lhrlslacktest.ngrok.io/finishedWorkouts/${username}`, data);
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `${username} just added reps of: \n  ${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}` }, config);
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.name}`);
        await web.views.publish(homepage(passUser, allWorkouts))
    } catch (err) {

        console.error(err.message);

    }

})
moreSlackInteractions.viewSubmission("create_goals", async (payload, respond) => {
    try {

        const username = payload.user.username;
        const { trigger_id } = payload;
        var { pushups, situps, squats, miles } = payload.view.state.values;
        pushups = pushups.pushups.value;
        situps = situps.situps.value;
        squats = squats.squats.value;
        miles = miles.miles.value;
        const data = {
            userId: username,
            pushups: parseInt(pushups),
            situps: parseInt(situps),
            squats: parseInt(squats),
            miles: parseInt(miles)
        }
        const sendGoals = await axios.post(`http://lhrlslacktest.ngrok.io/weeklyGoals/${username}`, data);
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `${username} just added weekly goals of: \n  ${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}` }, config);
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.name}`);
        await web.views.publish(homepage(passUser, allWorkouts))

    } catch (err) {

        console.error(err.message);

    }
});
moreSlackInteractions.viewSubmission("update_goals", async (payload, respond) => {
    try {
        console.log("\n\n\n\n\n\nWTF");
        const weeklyGoalId = payload.view.private_metadata
        const username = payload.user.username;
        const { trigger_id } = payload;
        var { pushups, situps, squats, miles } = payload.view.state.values;
        pushups = pushups.pushups.value;
        situps = situps.situps.value;
        squats = squats.squats.value;
        miles = miles.miles.value;
        const data = {
            userId: username,
            pushups: parseInt(pushups),
            situps: parseInt(situps),
            squats: parseInt(squats),
            miles: parseInt(miles)
        }
        const sendGoals = await axios.put(`http://lhrlslacktest.ngrok.io/weeklyGoals/${weeklyGoalId}`, data);
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `@${username} just updated weekly goals to: \n  ${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}` }, config);
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        console.log("\n userInfo: ", userInfo);
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.name}`);
        await web.views.publish(homepage(passUser, allWorkouts))
    } catch (err) {

        console.error(err.message);

    }
});





module.exports = {
    middleware: moreSlackInteractions.expressMiddleware()
}