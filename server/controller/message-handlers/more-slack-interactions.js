const moreSlackInteractions = require('./../../config/slack-interactions.js');

var CronJob = require('cron').CronJob;
const web = require('../../config/slack-web-api.js');
const homepage = require('../homepage/homeview.js');
const { User, Workout, Program, FinishedWorkout } = require('../../models/');
const { createGoalsMessage } = require('./helpers');
const { slack, sugarwod } = require('../../lib/keys');
const sendGraphView = require('./helpers/sendGraphView');
const {
    goalCount,
    goalSummary,
    accumulatedReps,
    goalSummaryMessage,
    graphPercentage
} = require('./helpers/weeklyGoals')
var dayjs = require('dayjs');
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
const axios = require('axios');
const config = { 'Content-Type': 'application/json' };
const sugarWodConfig = { 'Authorization': sugarwod.sugarwodKey };

var viewId;
var value;

moreSlackInteractions.viewSubmission('add_reps_to_goals', async (payload, respond) => {
    try {
        const username = payload.user.username;
        const user_id = payload.user.id

        var { pushups, situps, squats, miles } = payload.view.state.values;
        pushups = pushups.pushups.value;
        situps = situps.situps.value;
        squats = squats.squats.value;
        miles = miles.miles.value;
        const data = {
            user_id: username,
            pushups: parseInt(pushups),
            situps: parseInt(situps),
            squats: parseInt(squats),
            miles: parseInt(miles)
        }
        const sendWorkout = axios.post(`http://lhrlslacktest.ngrok.io/finishedWorkouts/${user_id}`, data);

        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.id}`);
        const weeklyGoals = allWorkouts.data[0].weeklyGoals[0];
        const repsComplete = allWorkouts.data[0].finishedWorkouts.filter(goals => {
            return dayjs().week() === dayjs(goals.date).week()
        });

        const reps = accumulatedReps(repsComplete, weeklyGoals);

        //returns percentag of goals to reps for graph
        const percentage = graphPercentage(reps, weeklyGoals);
        const pushupSummary = goalCount(repsComplete, "pushups");
        const situpSummary = goalCount(repsComplete, "situps");
        const squatSummary = goalCount(repsComplete, "squats");
        const mileSummary = goalCount(repsComplete, "miles");

        // const confirm = await axios.post(slack.lhrl_Webhook, { "text": `${username} just added reps of: \n ${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}` }, config);

        const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        await web.views.publish(homepage(passUser, allWorkouts, wod))
        const confirm = await axios.post(slack.lhrl_Webhook, {
            "text": `${username} just did some work! 💪`,
            "blocks": [{
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `${username} just completed reps of: \n${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}\n *Goal summary for this week:* ${goalSummaryMessage("pushups", weeklyGoals.pushups, pushupSummary)} ${goalSummaryMessage("situps", weeklyGoals.situps, situpSummary, username)} ${goalSummaryMessage("squats", weeklyGoals.squats, squatSummary, username)} ${goalSummaryMessage("miles", weeklyGoals.miles, mileSummary, username)}`
                },
                "accessory": {
                    "type": "image",
                    "image_url": sendGraphView(percentage),
                    "alt_text": "Graph for weekly workouts/weekly goals"
                }
            }]
        }, config);
    } catch (err) {

        console.error(err.message);

    }

})
moreSlackInteractions.viewSubmission("create_goals", async (payload, respond) => {
    try {

        const username = payload.user.username;
        const user_id = payload.user.id;
        const { trigger_id } = payload;
        var { pushups, situps, squats, miles } = payload.view.state.values;
        pushups = pushups.pushups.value;
        situps = situps.situps.value;
        squats = squats.squats.value;
        miles = miles.miles.value;
        const data = {
            userId: user_id,
            pushups: parseInt(pushups),
            situps: parseInt(situps),
            squats: parseInt(squats),
            miles: parseInt(miles)
        }

        const sendGoals = await axios.post(`http://lhrlslacktest.ngrok.io/weeklyGoals/${user_id}`, data);
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `${username} just added weekly goals of: \n  ${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}` }, config);
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.id}`);
        const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        await web.views.publish(homepage(passUser, allWorkouts, wod))

    } catch (err) {

        console.error(err.message);

    }
});
moreSlackInteractions.viewSubmission("update_goals", async (payload, respond) => {
    try {

        const weeklyGoalId = payload.view.private_metadata
        const username = payload.user.username;
        const user_id = payload.user.id;
        const { trigger_id } = payload;
        var { pushups, situps, squats, miles } = payload.view.state.values;
        pushups = pushups.pushups.value;
        situps = situps.situps.value;
        squats = squats.squats.value;
        miles = miles.miles.value;
        const data = {
            userId: user_id,
            pushups: parseInt(pushups),
            situps: parseInt(situps),
            squats: parseInt(squats),
            miles: parseInt(miles)
        }
        const sendGoals = await axios.put(`http://lhrlslacktest.ngrok.io/weeklyGoals/${weeklyGoalId}`, data);
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `${username} just updated weekly goals to: \n ${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}` }, config);
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });

        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.id}`);
        const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        await web.views.publish(homepage(passUser, allWorkouts, wod))
    } catch (err) {

        console.error(err.message);

    }
});

moreSlackInteractions.viewSubmission("cf_daily", async (payload, respond) => {
    try {


        const metadata = JSON.parse(payload.view.private_metadata);
        console.log("metadata: ", metadata);
        const { title, description, score_type } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
        const { trigger_id } = payload;
        var data;
        console.log("score_type: ", score_type);
        var { minutes, seconds, rounds, reps, weight, notes } = payload.view.state.values;
        if(score_type === "Rounds + Reps") {
            rounds = rounds.rounds.value;
            reps = reps.reps.value;
            notes = notes.notes.value;
            data = {
                type: score_type,
                name: title,
                description: description,
                rounds: parseInt(rounds),
                reps: parseInt(reps),
                notes: notes
            }
        } else if(score_type === "Time") {
            minutes = minutes.minutes.value;
            seconds = seconds.seconds.value;
            notes = notes.notes.value;
            data = {
                type: score_type,
                name: title,
                description: description,
                minutes: parseInt(minutes),
                seconds: parseInt(seconds),
                notes: notes
            }

        } else if(score_type === "Load") {
            console.log("I made it here")
            weight = weight.weight.value;
            notes = notes.notes.value;
            data = {
                type: score_type,
                name: title,
                description: description,
                weight: parseInt(weight),
                notes: notes
            }
        }
        const sendWorkout = await axios.post(`http://lhrlslacktest.ngrok.io/finishedWorkouts/${user_id}`, data);
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `🏋️‍♀️ ${username} just finished a CrossFit workout 🏋` }, config)
    } catch (err) {
        console.error(err.message);

    }


})





module.exports = {
    middleware: moreSlackInteractions.expressMiddleware()
}