const slackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const createWorkout = require('../forms/createWorkout.js');
const loadModal = require('../forms/createWorkout/loadModal');
const roundsPlusRepsModal = require('../forms/createWorkout/roundPlusRepsModal');
const timeModal = require('../forms/createWorkout/timeModal');
const viewWorkouts = require('../forms/viewWorkouts.js');
const editWorkout = require('../forms/editWorkout.js');
const submitTime = require('../forms/selectedProgram/submitTime.js');
const viewFinishedWorkouts = require('../forms/completedWorkouts/viewCompletedWorkouts');
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

        return
    } catch (err) {
        console.error(err.message);
    }

});

slackInteractions.action({ type: "static_select" }, async (payload, respond) => {
    try {
        var { trigger_id } = payload;
        var user_id = payload.user.id;
        value = payload.actions[0].selected_option.value;
        if(value === "5K") {
            // const workouts = await axios.get('http://lhrlslacktest.ngrok.io/programs/fiveK/view-program');
            const workouts = await axios.get(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/view-program/${value}`);
            const fiveKIndex = await view5KProgram(trigger_id, workouts);

            web.views.open(fiveKIndex);
        } else if(value === "10K") {
            const workouts = await axios.get(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/view-program/${value}`);
            const tenKIndex = await view10KProgram(trigger_id, workouts);
            web.views.open(tenKIndex);
        } else if(value === "rounds_plus_reps") {
            web.views.open(roundsPlusRepsModal(trigger_id));
        } else if(value === "time") {
            web.views.open(timeModal(trigger_id));

        } else if(value === "load") {
            web.views.open(loadModal(trigger_id));

        } else if(value === "view_workout") {
            const workouts = await axios.get(`https://lhrlslacktest.ngrok.io/slack/get-workouts/${user_id}`)
            const workoutIndex = await viewWorkouts(trigger_id, workouts);
            web.views.open(workoutIndex);
        } else if(value === "completed_workouts") {
            ////
            ////
            const finishedWorkouts = await axios.get(`https://lhrlslacktest.ngrok.io/finishedWorkouts/${user_id}`)
            const finishedWorkoutIndex = await viewFinishedWorkouts(trigger_id, finishedWorkouts);
            web.views.open(finishedWorkoutIndex);
            ///
            ///
        }
    } catch (err) {
        console.error(err.message);
    }
})
//buttons pressed from the homepage view
slackInteractions.action({ type: 'button' }, async (payload, respond) => {

    try {
        var buttonPressed = payload.actions[0].action_id.replace("updated", "");

        value = payload.actions[0].value;
        var text = payload.actions[0].text.text;
        var deleteBlockIdPressed = payload.actions[0].block_id;
        console.log("value: ", value);

        var { trigger_id } = payload;
        var username = payload.user.username;
        var user_id = payload.user.id;
        if(value === "edit_created_workouts") {

            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("delete", "");
            const workoutSelected = await Workout.find({ _id: buttonPressed });
            web.views.push(editWorkout(trigger_id, workoutSelected[0]));
        } else if(value === "delete_created_workouts") {
            //////
            console.log("value: ", value);
            console.log("\n\n\n\n\nWASSSSSSSuppppp\n\n\n");
            console.log("payload: ", payload);
            ///////
            // const updated = await updatedWorkouts(viewId, passUser.id);

            // web.views.update(updated)

            /////
            buttonPressed = buttonPressed.replace("delete", "");
            console.log("buttonPressed: ", buttonPressed);
            const deleteWorkout = await axios.delete(`https://lhrlslacktest.ngrok.io/slack/delete-workout/${buttonPressed}`);
            const workouts = await axios.get(`https://lhrlslacktest.ngrok.io/slack/get-workouts/${user_id}`)
            const workoutIndex = await viewWorkouts(trigger_id, workouts);
            web.views.push(workoutIndex);
        } else if(value === "program_workouts") {
            const workouts = await axios.get(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/get-workouts/${user_id}`)
            const listWorkouts = await selectedProgramWorkouts(trigger_id, workouts);
            web.views.open(listWorkouts)
        } else if(value === "remove_workouts") {
            const user = payload.user.id;
            const removePlan = await axios.delete(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/delete-program/${user_id}`);

            const userInfo = await web.users.info({ user: user });

            const passUser = userInfo.user;
            const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.id}`);
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

            const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
            web.views.open(submitScore(trigger_id, wod))
        } else if(value === 'Authorize Strava') {
            const user = payload.user.id;
            const userInfo = await web.users.info({ user: user });
            const passUser = userInfo.user;
            const { id, team_id, name, real_name } = userInfo.user;
            const data = {
                team_id: team_id,
                user_id: id,
                user_name: name,
                api_app_id: "A014GVBCQGG"
            }
            axios.post('http://lhrlslacktest.ngrok.io/strava/loginfromslack', data);
            // const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.id}`);
            // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
            // web.views.publish(homepage(passUser, allWorkouts, wod))
        } else if(value === 'Deauthorize Strava') {
            const user = payload.user.id;
            const userInfo = await web.users.info({ user: user });

            const passUser = userInfo.user;
            axios.put(`http://lhrlslacktest.ngrok.io/strava/deauth/${passUser.id}`);
            const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.id}`);
            const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
            web.views.publish(homepage(passUser, allWorkouts, wod))
        }
    } catch (err) {
        console.error(err.message);
    }
});

slackInteractions.viewSubmission('subscribe_to_5k', async (payload, respond) => {
    try {

        const { trigger_id } = payload;
        const value = payload.view.private_metadata;
        const date = payload.view.state.values.date.date.selected_date;
        const user_id = payload.user.id;
        const username = payload.user.username;

        const subscribe = await axios.post(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/subscribe/${user_id}/${value}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user
        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.id}`);
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
        const user_id = payload.user.id;
        const value = payload.view.private_metadata;
        console.log("value: ", value);

        const { trigger_id } = payload;
        const date = payload.view.state.values.date.date.selected_date;
        const username = payload.user.username;
        const subscribe = await axios.post(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/subscribe/${user_id}/${value}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.id}`);
        const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        web.views.publish(homepage(passUser, allWorkouts, wod))

        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `🏃‍♀️ ${username} just signed up for the 10k program 🏃‍♂️` }, config)
    } catch (err) {
        console.error(err.message);
    }
})

slackInteractions.viewSubmission('edit_workout', async (payload, respond) => {
    try {
        console.log("payload: ", payload);
        const metadata = JSON.parse(payload.view.private_metadata);
        const { id, score_type } = metadata;
        // const workoutId = payload.view.private_metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
        const { trigger_id } = payload;
        var data;
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });

        const passUser = userInfo.user;

        var { minutes, seconds, rounds, reps, weight, notes, name, description } = payload.view.state.values;

        if(score_type === "Rounds + Reps") {
            rounds = rounds.rounds.value || 0;
            reps = reps.reps.value || 0;
            notes = notes.notes.value || "No notes provided.";
            description = description.description.value || "No description provided.";
            name = name.name.value;
            data = {
                type: score_type,
                name: name,
                description: description,
                rounds: parseInt(rounds),
                reps: parseInt(reps),
                notes: notes
            }
        } else if(score_type === "Time") {
            minutes = minutes.minutes.value || 0;
            seconds = seconds.seconds.value || 0;

            notes = notes.notes.value || "No notes provided.";
            description = description.description.value || "No description provided.";
            name = name.name.value;

            data = {
                type: score_type,
                name: name,
                description: description,
                minutes: parseInt(minutes),
                seconds: parseInt(seconds),
                notes: notes
            }

        } else if(score_type === "Load") {
            console.log("I made it here")
            weight = weight.weight.value || 0;
            notes = notes.notes.value || "No notes provided.";
            description = description.description.value || "No description provided.";
            name = name.name.value;
            data = {
                type: score_type,
                name: name,
                description: description,
                weight: parseInt(weight),
                notes: notes
            }
        }

        const sendWorkout = await axios.put(`http://lhrlslacktest.ngrok.io/slack/edit-workout/${id}`, data);
        // web.views.update(editWorkoutResponse(viewId))
        const updated = await updatedWorkouts(viewId, passUser.id);

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
        const metadata = JSON.parse(payload.view.private_metadata);
        const { score_type } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
        const { trigger_id } = payload;
        var data;

        var { minutes, seconds, rounds, reps, weight, notes, name, description } = payload.view.state.values;

        if(score_type === "Rounds + Reps") {

            rounds = rounds.rounds.value || 0;

            reps = reps.reps.value || 0;
            notes = notes.notes.value || "No notes provided.";
            description = description.description.value || "No description provided.";
            name = name.name.value;
            data = {
                type: score_type,
                name: name,
                description: description,
                rounds: parseInt(rounds),
                reps: parseInt(reps),
                notes: notes
            }
        } else if(score_type === "Time") {
            minutes = minutes.minutes.value || 0;
            seconds = seconds.seconds.value || 0;
            notes = notes.notes.value || "No notes provided.";
            description = description.description.value || "No description provided.";
            name = name.name.value;

            data = {
                type: score_type,
                name: name,
                description: description,
                minutes: parseInt(minutes),
                seconds: parseInt(seconds),
                notes: notes
            }

        } else if(score_type === "Load") {
            console.log("I made it here")
            weight = weight.weight.value || 0;
            notes = notes.notes.value || "No notes provided.";
            description = description.description.value || "No description provided.";
            name = name.name.value;
            data = {
                type: score_type,
                name: name,
                description: description,
                weight: parseInt(weight),
                notes: notes
            }
        }
        const sendWorkout = await axios.post(`http://lhrlslacktest.ngrok.io/slack/create-workout/${user_id}`, data);
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `🏋️‍♀️ ${username} just created a new workout 🏋` }, config)

    } catch (err) {
        console.error(err.message);
    }

});

slackInteractions.viewSubmission('selected_program_workouts', async (payload, respond) => {
    try {
        const workoutId = payload.view.private_metadata;
        console.log("\n\n\n\nworkoutId: ", workoutId);
        const data = {
            minutes: payload.view.state.values.minutes.minutes.value,
            seconds: payload.view.state.values.seconds.seconds.value
        }
        const username = payload.user.username;
        const user_id = payload.user.id;
        console.log("\n\n\nuser_id: ", user_id)

        const sendWorkout = await axios.post(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/enter-score/${user_id}/${workoutId}`, data);

        //Taken from 'edit_workout' viewSubmission above

        const updated = await updatedProgramWorkouts(viewId, user_id);
        web.views.update(updated)
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;

        const allWorkouts = await axios.get(`http://lhrlslacktest.ngrok.io/getEverything/${passUser.id}`);
        const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        await web.views.publish(homepage(passUser, allWorkouts, wod))

    } catch (err) {
        console.error(err.message);
    }
})






module.exports = {
    middleware: slackInteractions.expressMiddleware()
}