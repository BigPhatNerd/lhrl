const slackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const createWorkout = require('../forms/createWorkout.js');
const viewWorkouts = require('../forms/viewWorkouts.js');
const editWorkout = require('../forms/editWorkout.js');
const submitTime = require('../forms/selectedProgram/submitTime.js');

const homepage = require('../homepage/homeview.js');
const { User, Workout, Program, WeeklyGoal } = require('../../models/');
const editWorkoutResponse = require('../responses/successful-edit');
const updatedWorkouts = require('../forms/updatedWorkouts.js');
const updatedProgramWorkouts = require('../forms/selectedProgram/updatedProgramWorkouts.js')
const view5KProgram = require('../forms/fiveK/viewProgram');
const view10KProgram = require('../forms/tenK/viewProgram');
const selectedProgramWorkouts = require('../forms/selectedProgram/selectedProgramWorkouts');
const setGoals = require('../forms/weeklyGoals/createGoals');
const updateGoals = require('../forms/weeklyGoals/updateGoals');
const addRepsToGoals = require('../forms/addRepsToGoals');
const submitScore = require('../forms/cfWOD/submitScore');
const { slack, sugarwod } = require('../../lib/keys');
const axios = require('axios');
const config = { 'Content-Type': 'application/json' };
const sugarWodConfig = { 'Authorization': sugarwod.sugarwodKey };

var viewId;
var value;

slackInteractions.viewSubmission('create_form', async (payload, respond) => {
    try {
        console.log("We are hitting here!");
        const { trigger_id } = payload;
        web.views.open(createWorkout(trigger_id))
        console.log("payload::: ", payload);
        return
    } catch (err) {
        console.error(err.message);
    }

});

//buttons pressed from the homepage view
slackInteractions.action({ type: 'button' }, async (payload, respond) => {

    try {
        var buttonPressed = payload.actions[0].action_id.replace("updated", "");

        value = payload.actions[0].value;
        var text = payload.actions[0].text.text;
        var deleteBlockIdPressed = payload.actions[0].block_id;


        var { trigger_id } = payload;
        var username = payload.user.username;
        if(value === "create_workout") {
            web.views.open(createWorkout(trigger_id));
        } else if(value === "view_workout") {
            const workouts = await axios.get(`https://lhrlslacktest.ngrok.io/slack/get-workouts/${username}`)
            const workoutIndex = await viewWorkouts(trigger_id, workouts);
            //this is what I want to update!!

            web.views.open(workoutIndex);
        } else if(text === "Edit Workout") {
            viewId = payload.container.view_id;


            buttonPressed = buttonPressed.replace("delete", "");

            const workoutSelected = await Workout.find({ _id: buttonPressed });
            web.views.push(editWorkout(trigger_id, workoutSelected[0]));
        } else if(text === "Delete Workout") {
            buttonPressed = buttonPressed.replace("delete", "");
            const deleteWorkout = await axios.delete(`https://lhrlslacktest.ngrok.io/slack/delete-workout/${buttonPressed}`);
            const workouts = await axios.get(`https://lhrlslacktest.ngrok.io/slack/get-workouts/${username}`)
            const workoutIndex = await viewWorkouts(trigger_id, workouts);
            web.views.push(workoutIndex);
        } else if(text === "6-Weeks to 5K") {
            // const workouts = await axios.get('http://lhrlslacktest.ngrok.io/programs/fiveK/view-program');
            const workouts = await axios.get(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/view-program/${value}`);
            const fiveKIndex = await view5KProgram(trigger_id, workouts);

            viewId = payload.view.id;

            web.views.open(fiveKIndex);
        } else if(text === "6-Weeks to 10K") {
            const workouts = await axios.get(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/view-program/${value}`);
            const tenKIndex = await view10KProgram(trigger_id, workouts);

            viewId = payload.view.id;

            web.views.open(tenKIndex);
        } else if(value === "program_workouts") {
            const workouts = await axios.get(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/get-workouts/${username}`)
            const listWorkouts = await selectedProgramWorkouts(trigger_id, workouts);
            web.views.open(listWorkouts)
        } else if(value === "remove_workouts") {
            const removePlan = await axios.delete(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/delete-program/${username}`);
            const user = payload.user.id;
            const userInfo = await web.users.info({ user: user });

            const passUser = userInfo.user;
            const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.name}`);
            const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
            web.views.publish(homepage(passUser, allWorkouts, wod))
        } else if(value === "selected_program_score") {
            viewId = payload.container.view_id;

            //Open modal to enter score for program workout
            buttonPressed = buttonPressed.replace("selected_program_score", "");
            const workoutSelected = await Program.find({ _id: buttonPressed });
            const submitTimeView = await submitTime(trigger_id, workoutSelected[0]);
            web.views.push(submitTimeView);

        } else if(value === 'daily_program_score') {

            buttonPressed = buttonPressed.replace("daily_program_score", "");
            const workoutSelected = await Program.find({ _id: buttonPressed });
            const submitTimeView = await submitTime(trigger_id, workoutSelected[0]);
            web.views.open(submitTimeView);
        } else if(value === "weekly_goal") {
            web.views.open(setGoals(trigger_id));
        } else if(value === "update_weekly_goal") {
            viewId = payload.container.view_id;

            buttonPressed = buttonPressed.replace("update_weekly_goal", "");
            const goalsSelected = await WeeklyGoal.find({ _id: buttonPressed });
            web.views.open(updateGoals(trigger_id, goalsSelected[0]))
        } else if(value === 'add_reps_to_goal') {
            web.views.open(addRepsToGoals(trigger_id));
        } else if(value === 'cf_wod_score') {
            console.log("I am here!");
            const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
            web.views.open(submitScore(trigger_id, wod))
        }
    } catch (err) {
        console.error(err.message);
    }
});

slackInteractions.viewSubmission('subscribe_to_5k', async (payload, respond) => {
    try {

        const { trigger_id } = payload;
        //YEEEHAWWWW
        const date = payload.view.state.values.date.date.selected_date;

        const username = payload.user.username;

        const subscribe = await axios.post(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/subscribe/${username}/${value}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user
        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.name}`);
        const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        web.views.publish(homepage(passUser, allWorkouts, wod))
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `🏃‍♀️ ${username} just signed up for the 5k program 🏃‍♂️` }, config)
        // const newhomePageView = await axios.post(`http://lhrlslacktest.ngrok.io/slack/events`);
    } catch (err) {
        console.error(err.message);
    }
});

slackInteractions.viewSubmission('subscribe_to_10k', async (payload, respond) => {
    try {

        const { trigger_id } = payload;
        const date = payload.view.state.values.date.date.selected_date;
        const username = payload.user.username;
        const subscribe = await axios.post(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/subscribe/${username}/${value}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.name}`);
        const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        web.views.publish(homepage(passUser, allWorkouts, wod))

        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `🏃‍♀️ ${username} just signed up for the 10k program 🏃‍♂️` }, config)
    } catch (err) {
        console.error(err.message);
    }
})

slackInteractions.viewSubmission('edit_workout', async (payload, respond) => {
    try {

        const workoutId = payload.view.private_metadata;
        const username = payload.user.username;
        var { type, name, duration, weight, reps, sets, distance } = payload.view.state.values;
        type = type.choose_type.selected_option.value;
        name = name.name.value;
        duration = duration.duration.value;
        weight = weight.weight.value;
        reps = reps.reps.value;
        sets = sets.sets.value;
        distance = distance.distance.value;
        const data = {
            type: type,
            name: name,
            duration: parseInt(duration),
            weight: parseInt(weight),
            reps: parseInt(reps),
            sets: parseInt(sets),
            distance: parseInt(distance)
        }
        const sendWorkout = await axios.put(`http://lhrlslacktest.ngrok.io/slack/edit-workout/${workoutId}`, data);
        // web.views.update(editWorkoutResponse(viewId))
        const updated = await updatedWorkouts(viewId, username);

        web.views.update(updated)
    } catch (err) {

        console.error(err.message);

    }
});
slackInteractions.viewSubmission('view_workouts', async (payload, respond) => {
    return Promise.resolve({
        "response_action": "clear"
    })
})

slackInteractions.viewSubmission('create_workout', async (payload, respond) => {
    try {
        const username = payload.user.username;
        const { trigger_id } = payload;
        var { type, name, duration, weight, reps, sets, distance } = payload.view.state.values;
        type = type.choose_type.selected_option.value;
        name = name.name.value;
        duration = duration.duration.value;
        weight = weight.weight.value;
        reps = reps.reps.value;
        sets = sets.sets.value;
        distance = distance.distance.value;
        const data = {
            type: type,
            name: name,
            duration: parseInt(duration),
            weight: parseInt(weight),
            reps: parseInt(reps),
            sets: parseInt(sets),
            distance: parseInt(distance)
        }
        const sendWorkout = await axios.post(`http://lhrlslacktest.ngrok.io/slack/create-workout/${username}`, data);
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `🏋️‍♀️ ${username} just created a workout 🏋` }, config)
    } catch (err) {
        console.error(err.message);
    }

});

slackInteractions.viewSubmission('selected_program_workouts', async (payload, respond) => {
    try {
        const workoutId = payload.view.private_metadata;
        console.log("payload.view.state.values.time.time.value: ", payload.view.state.values.time.time.value)
        const data = { time: payload.view.state.values.time.time.value }
        const username = payload.user.username;

        const sendWorkout = await axios.post(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/enter-score/${username}/${workoutId}`, data);

        //Taken from 'edit_workout' viewSubmission above
        const updated = await updatedProgramWorkouts(viewId, username);
        web.views.update(updated)
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;

        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.name}`);
        const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        await web.views.publish(homepage(passUser, allWorkouts, wod))

    } catch (err) {
        console.error(err.message);
    }
})






module.exports = {
    middleware: slackInteractions.expressMiddleware()
}