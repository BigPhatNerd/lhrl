const moreSlackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const homepage = require('../homepage/homeview.js');
const { User, Workout, Program, FinishedWorkout, CrossFit } = require('../../models/');
const { createGoalsMessage, intValidation } = require('./helpers');
const { slack, sugarwod, url } = require('../../lib/keys');
const sendGraphView = require('./helpers/sendGraphView');
const updateHomeModal = require('../homepage/updateHomeModal');
const updatedCalendarWorkouts = require('../modals/calendar/updateCalendar');
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

moreSlackInteractions.viewSubmission('selected_program_workouts_index', async (payload, respond) => {
    const metadata = JSON.parse(payload.view.private_metadata);
    const { home_or_slash, homeModal_view_id } = metadata;
    const user = payload.user.id;
    const userInfo = await web.users.info({ user: user });
    const passUser = userInfo.user;
    const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
    const wod = await CrossFit.find().limit(1).sort({ date: -1 });
    if(home_or_slash === "slash") {
        web.views.update(updateHomeModal(payload.view.root_view_id, passUser, allWorkouts, wod[0]))
        return
    }

    web.views.publish(homepage(passUser, allWorkouts, wod[0]))

})

moreSlackInteractions.viewSubmission('homepage_modal', async (payload, respond) => {

})

moreSlackInteractions.viewSubmission('add_reps_to_goals', async (payload, respond) => {
    try {
        const username = payload.user.username;
        const user_id = payload.user.id

        var { pushups, situps, squats, miles } = payload.view.state.values;
        pushups = pushups.pushups.value;
        let isPushups = /^\d+$/.test(pushups);
        if(!isPushups) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    pushups: "Must enter an integer"
                }
            })
        }
        situps = situps.situps.value;
        let isSitups = /^\d+$/.test(situps);
        if(!isSitups) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    situps: "Must enter an integer"
                }
            })
        }
        squats = squats.squats.value;
        let isSquats = /^\d+$/.test(squats);
        if(!isSquats) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    squats: "Must enter an integer"
                }
            })
        }
        miles = miles.miles.value;
        let isMiles = /^[1-9]\d*(\.\d+)?$/.test(miles);
        if(!isMiles) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    miles: "Must enter a number"
                }
            })
        }
        const data = {
            user_id: username,
            pushups: parseInt(pushups),
            situps: parseInt(situps),
            squats: parseInt(squats),
            miles: parseFloat(miles)
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

        const metadata = JSON.parse(payload.view.private_metadata);
        const { home_or_slash } = metadata;
        const radioButton = payload.view.state.values.radio['radio_buttons-action'].selected_option.value;
        if(radioButton === "public") {
            const confirm = await axios.post(lhrlWebhook, {
                "text": `${passUser.real_name} just did some work! 💪`,
                "blocks": [{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${passUser.real_name} just completed reps of: \n${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}\n *Goal summary for this week:* ${goalSummaryMessage("pushups", weeklyGoals.pushups, pushupSummary)} ${goalSummaryMessage("situps", weeklyGoals.situps, situpSummary, username)} ${goalSummaryMessage("squats", weeklyGoals.squats, squatSummary, username)} ${goalSummaryMessage("miles", weeklyGoals.miles, mileSummary, username)}`
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": sendGraphView(percentage),
                        "alt_text": "Graph for weekly workouts/weekly goals"
                    }
                }]
            }, config);
        }
        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        if(home_or_slash === "slash") {

            const update = await updateHomeModal(payload.view.root_view_id, passUser, allWorkouts, wod[0]);
            web.views.update(update)
            return
        }
        const updateHomepage = await homepage(passUser, allWorkouts, wod[0]);
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
        let isPushups = /^\d+$/.test(pushups);
        if(!isPushups) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    pushups: "Must enter an integer"
                }
            })
        }
        situps = situps.situps.value;
        let isSitups = /^\d+$/.test(situps);
        if(!isSitups) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    situps: "Must enter an integer"
                }
            })
        }
        squats = squats.squats.value;
        let isSquats = /^\d+$/.test(squats);
        if(!isSquats) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    squats: "Must enter an integer"
                }
            })
        }
        miles = miles.miles.value;
        let isMiles = /^[1-9]\d*(\.\d+)?$/.test(miles);
        if(!isMiles) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    miles: "Must enter a number"
                }
            })
        }
        const data = {
            userId: user_id,
            pushups: parseInt(pushups),
            situps: parseInt(situps),
            squats: parseInt(squats),
            miles: parseFloat(miles)
        }

        const sendGoals = await axios.post(`${urlString}/weeklyGoals/${user_id}`, data);

        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const radioButton = payload.view.state.values.radio['radio_buttons-action'].selected_option.value;
        if(radioButton === "public") {
            const confirm = await axios.post(lhrlWebhook, { "text": `${passUser.real_name} just added weekly goals of: \n  ${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}` }, config);
        }
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        const metadata = JSON.parse(payload.view.private_metadata);
        const { home_or_slash } = metadata;
        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        if(home_or_slash === "slash") {


            const update = await updateHomeModal(payload.view.root_view_id, passUser, allWorkouts, wod[0])
            web.views.update(update)
            return
        }
        const updateHome = await homepage(passUser, allWorkouts, wod[0]);
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
        let isPushups = /^\d+$/.test(pushups);
        if(!isPushups) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    pushups: "Must enter an integer"
                }
            })
        }
        situps = situps.situps.value;
        let isSitups = /^\d+$/.test(situps);
        if(!isSitups) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    situps: "Must enter an integer"
                }
            })
        }
        squats = squats.squats.value;
        let isSquats = /^\d+$/.test(squats);
        if(!isSquats) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    squats: "Must enter an integer"
                }
            })
        }
        miles = miles.miles.value;
        let isMiles = /^[1-9]\d*(\.\d+)?$/.test(miles);
        if(!isMiles) {

            return Promise.resolve({
                response_action: "errors",
                errors: {
                    miles: "Must enter a number"
                }
            })
        }
        const data = {
            userId: user_id,
            pushups: parseInt(pushups),
            situps: parseInt(situps),
            squats: parseInt(squats),
            miles: parseFloat(miles)
        }
        const sendGoals = await axios.put(`${urlString}/weeklyGoals/${id}`, data);

        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });

        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const radioButton = payload.view.state.values.radio['radio_buttons-action'].selected_option.value;
        if(radioButton === "public") {
            const confirm = await axios.post(lhrlWebhook, { "text": `${passUser.real_name} just updated weekly goals to: \n ${createGoalsMessage("Pushups", pushups)} ${createGoalsMessage("Situps", situps)} ${createGoalsMessage("Squats", squats)} ${createGoalsMessage("Miles", miles)}` }, config);
        }
        // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        if(home_or_slash === "slash") {

            const update = await updateHomeModal(payload.view.root_view_id, passUser, allWorkouts, wod[0])
            web.views.update(update)
            return
        }
        const updateHome = await homepage(passUser, allWorkouts, wod[0]);
        await web.views.publish(updateHome)
    } catch (err) {

        console.error(err.message);

    }
});

moreSlackInteractions.viewSubmission("cf_daily", async (payload, respond) => {
    try {


        const metadata = JSON.parse(payload.view.private_metadata);

        const { title, description, score_type, home_or_slash, id } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;

        var data;

        var { minutes, seconds, rounds, reps, weight, meters, notes } = payload.view.state.values;


        //REGEX for DECIMAL
        // let includeDecimal = /^[1-9]\d*(\.\d+)?$/.test(minutes.minutes.value)


        if(score_type === "Reps") {
            reps = reps.reps.value;
            let isReps = /^\d+$/.test(reps);
            if(!isReps) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        reps: "Must enter an integer"
                    }
                })
            }
            notes = notes.notes.value || "No notes provided.";
            data = {
                type: score_type,
                name: title,
                description: description,
                reps: parseInt(reps),
                notes: notes
            }
        } else if(score_type === "Rounds + Reps") {
            rounds = rounds.rounds.value;
            let isRounds = /^\d+$/.test(rounds);
            if(!isRounds) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        rounds: "Must enter an integer"
                    }
                })
            }
            reps = reps.reps.value;
            let isReps = /^\d+$/.test(reps);
            if(!isReps) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        reps: "Must enter an integer"
                    }
                })
            }
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
            let isMin = /^\d+$/.test(minutes);
            if(!isMin) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        minutes: "Must enter an integer"
                    }
                })
            }
            let isSec = /^\d+$/.test(seconds);
            if(!isSec) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        seconds: "Must enter an integer"
                    }
                })
            }

            notes = notes.notes.value || "No notes provided";
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
            let isWeight = /^\d+$/.test(weight);
            if(!isWeight) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        weight: "Must enter an integer"
                    }
                })
            }
            notes = notes.notes.value || "No notes provided";
            data = {
                type: score_type,
                name: title,
                description: description,
                weight: parseInt(weight),
                notes: notes
            }
        } else if(score_type === "Other / Text") {


            notes = notes.notes.value;
            data = {
                type: score_type,
                name: title,
                description: description,
                notes: notes
            }
        } else if(score_type === "Meters") {
            meters = meters.meters.value;
            let isMeters = /^\d+$/.test(meters);
            if(!isMeters) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        meters: "Must enter an integer"
                    }
                })
            }

            notes = notes.notes.value || "No notes provided";
            data = {
                type: score_type,
                name: title,
                description: description,
                meters: parseInt(meters),
                notes: notes
            }
        }
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });

        const passUser = userInfo.user;
        const view_id = payload.view.root_view_id;

        const sendWorkout = await axios.post(`${urlString}/finishedWorkouts/${user_id}`, data);

        const radioButton = payload.view.state.values.radio['radio_buttons-action'].selected_option.value;
        if(radioButton === "public") {
            const confirm = await axios.post(lhrlWebhook, { "text": `🏋️‍♀️ ${passUser.real_name} just finished a CrossFit workout 🏋` }, config);
        }
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);


        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        if(home_or_slash === "slash") {
            const update = await updateHomeModal(payload.view.root_view_id, passUser, allWorkouts, wod[0])
            web.views.update(update)
            return
        }
        const homePage = await homepage(passUser, allWorkouts, wod[0]);
        await web.views.publish(homePage);
    } catch (err) {
        console.error(err.message);

    }


});

moreSlackInteractions.viewSubmission("view_calendar_workouts", async (payload, respond) => {
    console.log("Not sure what to do with view_calendar_workouts in more-slack-interactions")
})


module.exports = {
    middleware: moreSlackInteractions.expressMiddleware()
}