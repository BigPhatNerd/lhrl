const moreSlackInteractions = require('./../../config/slack-interactions.js');

var CronJob = require('cron').CronJob;
const web = require('../../config/slack-web-api.js');
const homepage = require('../homepage/homeview.js');
const { User, Workout, Program, FinishedWorkout, CrossFit } = require('../../models/');
const { createGoalsMessage } = require('./helpers');
const { slack, sugarwod, url } = require('../../lib/keys');
const sendGraphView = require('./helpers/sendGraphView');
const updateHomeModal = require('../homepage/updateHomeModal');
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
const urlString = process.env.NODE_ENV === "production" ? "https://immense-shelf-69979.herokuapp.com" : url.development;
const lhrlWebhook = process.env.NODE_ENV === "production" ? slack.lhrl_Webhook : slack.dev_lhrl_Webhook;
var viewId;
var value;

moreSlackInteractions.viewSubmission('selected_program_workouts_index', async (payload, respond) =>{
    console.log("line 28 moreSlackInteractions");
    console.log("payload: ", payload);
    const metadata = JSON.parse(payload.view.private_metadata);
    const { home_or_slash, homeModal_view_id } = metadata;
    console.log("home_or_slash: ", home_or_slash);
    console.log("homeModal_view_id: ", homeModal_view_id);

    const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);      
    if(home_or_slash === "slash"){
web.views.update(updateHomeModal(homeModal_view_id, passUser, allWorkouts)) 
return       
    }

web.views.publish(homepage(passUser, allWorkouts))

})

moreSlackInteractions.viewSubmission('homepage_modal', async (payload, respond) => {
console.log("YesSS");
console.log("payload in homepage: ", payload);
})

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
        const sendWorkout = axios.post(`${urlString}/finishedWorkouts/${user_id}`, data);

        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
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

        // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
         const metadata = JSON.parse(payload.view.private_metadata);
    const { home_or_slash, homeModal_view_id } = metadata;

    const confirm = await axios.post(lhrlWebhook, {
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
if(home_or_slash === "slash"){
     const wod = await CrossFit.find().limit(1).sort({$natural:-1});
     const update = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0]);
web.views.update(update) 
return      
}
const updateHomepage = await homepage(passUser, allWorkouts);
        await web.views.publish(updateHomepage);
        

    } catch (err) {

        console.error(err.message);

    }

})
moreSlackInteractions.viewSubmission("create_goals", async (payload, respond) => {
    try {

        const username = payload.user.username;
        const user_id = payload.user.id;
        
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

        const sendGoals = await axios.post(`${urlString}/weeklyGoals/${user_id}`, data);
        const confirm = await axios.post(lhrlWebhook, { "text": `${username} just added weekly goals of: \n  ${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}` }, config);
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        const metadata = JSON.parse(payload.view.private_metadata);
    const { home_or_slash, homeModal_view_id } = metadata;
if(home_or_slash === "slash"){
    console.log("homeModal_view_id: ", homeModal_view_id);
     const wod = await CrossFit.find().limit(1).sort({$natural:-1});
     const update = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])
web.views.update(update) 
return      
}
const updateHome = await homepage(passUser, allWorkouts);
        await web.views.publish(updateHome);

    } catch (err) {

        console.error(err.message);

    }
});
moreSlackInteractions.viewSubmission("update_goals", async (payload, respond) => {
    try {
const metadata = JSON.parse(payload.view.private_metadata);
    const { home_or_slash, homeModal_view_id, id } = metadata;
        
        const username = payload.user.username;
        const user_id = payload.user.id;
        
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
        const sendGoals = await axios.put(`${urlString}/weeklyGoals/${id}`, data);
        const confirm = await axios.post(lhrlWebhook, { "text": `${username} just updated weekly goals to: \n ${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}` }, config);
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });

        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });

if(home_or_slash === "slash"){
const wod = await CrossFit.find().limit(1).sort({$natural:-1});
const update = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])
web.views.update( update) 
return      
}
const updateHome = await homepage(passUser, allWorkouts);
        await web.views.publish(updateHome)
    } catch (err) {

        console.error(err.message);

    }
});

moreSlackInteractions.viewSubmission("cf_daily", async (payload, respond) => {
    try {


        const metadata = JSON.parse(payload.view.private_metadata);

        const { title, description, score_type,home_or_slash, id } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
       
        var data;

        var { minutes, seconds, rounds, reps, weight, notes } = payload.view.state.values;

        if(score_type === "Rounds + Reps") {
            rounds = rounds.rounds.value;
            reps = reps.reps.value;
            notes = notes.notes.value || "No notes provided.";
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

            weight = weight.weight.value;
            notes = notes.notes.value;
            data = {
                type: score_type,
                name: title,
                description: description,
                weight: parseInt(weight),
                notes: notes
            }
        }else if(score_type === "Other / Text") {

            weight = weight.weight.value;
            notes = notes.notes.value;
            data = {
                type: score_type,
                name: title,
                description: description,
                notes: notes
            }
        }
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });

        const passUser = userInfo.user;
const view_id = payload.view.root_view_id;
       
        const sendWorkout = await axios.post(`${urlString}/finishedWorkouts/${user_id}`, data);
        console.log("\n\n\nsendWorkout: ", sendWorkout)
        const confirm = await axios.post(lhrlWebhook, { "text": `🏋️‍♀️ ${username} just finished a CrossFit workout 🏋` }, config);
         const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
console.log("271");

 const wod = await CrossFit.find().limit(1).sort({$natural:-1});
       if(home_or_slash === "slash"){
       
        console.log("wod in")
        const update = await updateHomeModal(view_id, passUser, allWorkouts, wod[0])
web.views.update(update) 
return      
}
const homePage = await homepage(passUser, allWorkouts, wod[0]);
        await web.views.publish(homePage);
    } catch (err) {
        console.error(err.message);

    }


})





module.exports = {
    middleware: moreSlackInteractions.expressMiddleware()
}