const slackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const createWorkout = require('../forms/createWorkout.js');
const createWorkoutModal = require('../forms/createWorkout/createWorkoutModal');
const loadModal = require('../forms/createWorkout/loadModal');
const roundsPlusRepsModal = require('../forms/createWorkout/roundPlusRepsModal');
const timeModal = require('../forms/createWorkout/timeModal');
const distanceModal = require("../forms/createWorkout/timeModal");
const viewWorkouts = require('../forms/viewWorkouts.js');
const editWorkout = require('../forms/editWorkout.js');
const editCompletedWorkout = require('../forms/completedWorkouts/editCompletedWorkouts');
const submitTime = require('../forms/selectedProgram/submitTime.js');
const viewFinishedWorkouts = require('../forms/completedWorkouts/viewCompletedWorkouts');
const homepage = require('../homepage/homeview.js');
const { User, Workout, Program, WeeklyGoal, FinishedWorkout, Session } = require('../../models/');
const editWorkoutResponse = require('../responses/successful-edit');
const updatedWorkouts = require('../forms/updatedWorkouts.js');
const updatedCompletedWorkouts = require('../forms/completedWorkouts/updatedCompletedWorkouts');
const updatedProgramWorkouts = require('../forms/selectedProgram/updatedProgramWorkouts.js')
const view5KProgram = require('../forms/fiveK/viewProgram');
const view10KProgram = require('../forms/tenK/viewProgram');
const selectedProgramWorkouts = require('../forms/selectedProgram/selectedProgramWorkouts');
const setGoals = require('../forms/weeklyGoals/createGoals');
const updateGoals = require('../forms/weeklyGoals/updateGoals');
const addRepsToGoals = require('../forms/addRepsToGoals');
const submitScore = require('../forms/cfWOD/submitScore');
const { slack, sugarwod, url } = require('../../lib/keys');
const axios = require('axios');
const config = { 'Content-Type': 'application/json' };
const sugarWodConfig = { 'Authorization': sugarwod.sugarwodKey };
const urlString = process.env.NODE_ENV === "production" ? "https://immense-shelf-69979.herokuapp.com" : url.development
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
            // const workouts = await axios.get('${urlString}/programs/fiveK/view-program');
            const workouts = await axios.get(`${urlString}/programs/selectedProgram/view-program/${value}`);
            const fiveKIndex = await view5KProgram(trigger_id, workouts);

            web.views.open(fiveKIndex);
        } else if(value === "10K") {
            const workouts = await axios.get(`${urlString}/programs/selectedProgram/view-program/${value}`);
            const tenKIndex = await view10KProgram(trigger_id, workouts);
            web.views.open(tenKIndex);
        } else if(value === "rounds_plus_reps" || value === "time" || value === "load" || value === "distance") {
///

///////
//This is where we are playing
if(payload.view.callback_id === "homepage_modal") {
    console.log("Yep");
    web.views.push(createWorkoutModal(trigger_id, value));
    return
}



////

///
            console.log("payload: ", payload);
            web.views.open(createWorkoutModal(trigger_id, value));
        } else if(value === "view_workout") {
            const workouts = await axios.get(`${urlString}/slack/get-workouts/${user_id}`)
            const workoutIndex = await viewWorkouts(trigger_id, workouts);
            web.views.open(workoutIndex);
        } else if(value === "completed_workouts") {
            const finishedWorkouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)
            const finishedWorkoutIndex = await viewFinishedWorkouts(trigger_id, finishedWorkouts);
            web.views.open(finishedWorkoutIndex);

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


        var { trigger_id } = payload;
        var username = payload.user.username;
        var user_id = payload.user.id;
        if(value === "complete_created_workouts") {
            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("complete", "");
            const workoutSelected = await Workout.find({ _id: buttonPressed });
            if(workoutSelected[0].type === "Rounds + Reps") {

                web.views.push(roundsPlusRepsModal(trigger_id, workoutSelected[0]));
            } else if(workoutSelected[0].type === "Time") {
                web.views.push(timeModal(trigger_id, workoutSelected[0]));
            } else if(workoutSelected[0].type === "Load") {
                web.views.push(loadModal(trigger_id, workoutSelected[0]));
            } else if(workoutSelected[0].type === "Distance") {
                web.views.push(distanceModal(trigger_id, workoutSelected[0]));
            }


        } else if(value === "edit_created_workouts") {

            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("delete", "");
            const workoutSelected = await Workout.find({ _id: buttonPressed });
            web.views.push(editWorkout(trigger_id, workoutSelected[0]));
        } else if(value === "delete_created_workouts") {

            buttonPressed = buttonPressed.replace("delete", "");
            const deleteWorkout = await axios.delete(`${urlString}/slack/delete-workout/${buttonPressed}`);
            const workouts = await axios.get(`${urlString}/slack/get-workouts/${user_id}`)
            const workoutIndex = await viewWorkouts(trigger_id, workouts);
            web.views.push(workoutIndex);
        } else if(value === "complete_completed_workouts") {
            //This is where I am working
            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("complete", "");
            const workoutSelected = await FinishedWorkout.find({ _id: buttonPressed });
            if(workoutSelected[0].type === "Rounds + Reps") {

                web.views.push(roundsPlusRepsModal(trigger_id, workoutSelected[0]));
            } else if(workoutSelected[0].type === "Time") {
                web.views.push(timeModal(trigger_id, workoutSelected[0]));
            } else if(workoutSelected[0].type === "Load") {
                web.views.push(loadModal(trigger_id, workoutSelected[0]));
            } else if(workoutSelected[0].type === "Distance") {
                web.views.push(distanceModal(trigger_id, workoutSelected[0]));
            }


        } else if(value === "edit_completed_workouts") {

            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("delete", "");
            const workoutSelected = await FinishedWorkout.find({ _id: buttonPressed });
            web.views.push(editCompletedWorkout(trigger_id, workoutSelected[0]));
        } else if(value === "delete_completed_workouts") {
            //THIS IS WHERE I AM

            buttonPressed = buttonPressed.replace("delete", "");
            console.log("buttonPressed: ", buttonPressed);
            // const deleteWorkout = await axios.delete(`${urlString}/finishedWorkouts/delete/${buttonPressed}`);
            const deleteWorkout = await FinishedWorkout.deleteOne({ _id: buttonPressed });
            const workouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)
            const workoutIndex = await viewFinishedWorkouts(trigger_id, workouts);
            web.views.push(workoutIndex);
        } else if(value === "program_workouts") {
            const workouts = await axios.get(`${urlString}/programs/selectedProgram/get-workouts/${user_id}`)
            const listWorkouts = await selectedProgramWorkouts(trigger_id, workouts);
            web.views.open(listWorkouts)
        } else if(value === "remove_workouts") {
            const user = payload.user.id;
            const removePlan = await axios.delete(`${urlString}/programs/selectedProgram/delete-program/${user_id}`);

            const userInfo = await web.users.info({ user: user });

            const passUser = userInfo.user;
            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
            // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
            web.views.publish(homepage(passUser, allWorkouts))
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
            const api_app_id = payload.api_app_id;
            const data = {
                team_id: team_id,
                user_id: id,
                user_name: name,
                api_app_id: api_app_id
            }

            // axios.post(`${urlString}/strava/loginfromslack`, data);
            /////////


            const deleteSessions = await Session.deleteMany({});
            const createSession = await Session.create({ userId: user_id, team_id: team_id, api_app_id: api_app_id });
            const createUser = await User.findOneAndUpdate({ team_id: team_id }, { $set: { user_id: user_id, user_name: name } }, { upsert: true, new: true });
            console.log("createUser: ", createUser);
            ////
            // const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
            // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
            // web.views.publish(homepage(passUser, allWorkouts, wod))
        } else if(value === 'Deauthorize Strava') {
            const user = payload.user.id;
            const userInfo = await web.users.info({ user: user });

            const passUser = userInfo.user;
            axios.put(`${urlString}/strava/deauth/${passUser.id}`);
            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
            // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
            web.views.publish(homepage(passUser, allWorkouts))
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

        const subscribe = await axios.post(`${urlString}/programs/selectedProgram/subscribe/${user_id}/${value}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        web.views.publish(homepage(passUser, allWorkouts))
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `🏃‍♀️ ${username} just signed up for the 5k program 🏃‍♂️` }, config)
        // const newhomePageView = await axios.post(`${urlString}/slack/events`);
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
        const subscribe = await axios.post(`${urlString}/programs/selectedProgram/subscribe/${user_id}/${value}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        web.views.publish(homepage(passUser, allWorkouts))

        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `🏃‍♀️ ${username} just signed up for the 10k program 🏃‍♂️` }, config)
    } catch (err) {
        console.error(err.message);
    }
});

slackInteractions.viewSubmission('edit_created_workout', async (payload, respond) => {
    try {

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
        var { name, description } = payload.view.state.values;
        description = description.description.value;
        name = name.name.value;
        data = {
            type: score_type,
            name: name,
            description: description,
        }
        const sendWorkout = await axios.put(`${urlString}/slack/edit-workout/${id}`, data);
        const updated = await updatedWorkouts(viewId, passUser.id);
        web.views.update(updated)
    } catch (err) {
        console.error(err.message);
    }
});


slackInteractions.viewSubmission('edit_completed_workout', async (payload, respond) => {
    try {
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
        console.log("\n\n\n\nI am here!!!");
        const sendWorkout = await axios.put(`${urlString}/finishedWorkouts/edit/${id}`, data);
        const updated = await updatedCompletedWorkouts(viewId, passUser.id);
        web.views.update(updated)
    } catch (err) {
        console.error(err.message);
    }
});
slackInteractions.viewSubmission('view_workouts', async (payload, respond) => {
    return Promise.resolve({
        "response_action": "clear"
    })
});

slackInteractions.viewSubmission('create_workout', async (payload, respond) => {
    try {
        const metadata = JSON.parse(payload.view.private_metadata);
        const { score_type } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
        const { trigger_id } = payload;
        var data;

        var { name, description } = payload.view.state.values;


        description = description.description.value || "No description provided.";
        name = name.name.value;
        data = {
            type: score_type,
            name: name,
            description: description,

        }
        const sendWorkout = await axios.post(`${urlString}/slack/create-workout/${user_id}`, data);
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `🏋️‍♀️ ${username} just created a new workout 🏋` }, config)

        //I just added this. Maybe not necessary
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;

        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        console.log("payload in create workout looking for /command: ", payload);
        // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        await web.views.publish(homepage(passUser, allWorkouts))
    } catch (err) {
        console.error(err.message);
    }

});

slackInteractions.viewSubmission('complete_workout', async (payload, respond) => {
    try {
        const metadata = JSON.parse(payload.view.private_metadata);
        const { score_type, name, description } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
        const { trigger_id } = payload;
        var data;
        var { minutes, seconds, rounds, reps, weight, miles, notes } = payload.view.state.values;

        if(score_type === "Rounds + Reps") {

            rounds = rounds.rounds.value || 0;

            reps = reps.reps.value || 0;
            notes = notes.notes.value || "No notes provided.";
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
            data = {
                type: score_type,
                name: name,
                description: description,
                minutes: parseInt(minutes),
                seconds: parseInt(seconds),
                notes: notes
            }

        } else if(score_type === "Load") {
            weight = weight.weight.value || 0;
            notes = notes.notes.value || "No notes provided.";
            data = {
                type: score_type,
                name: name,
                description: description,
                weight: parseInt(weight),
                notes: notes
            }
        } else if(score_type === "Distance") {
            miles = miles.miles.value || 0;
            notes = notes.notes.value || "No notes provided.";
            data = {
                type: score_type,
                name: name,
                description: description,
                miles: parseInt(miles),
                notes: notes
            }
        }
        const sendWorkout = await axios.post(`${urlString}/finishedWorkouts/${user_id}`, data);
        const confirm = await axios.post(slack.lhrl_Webhook, { "text": `🏋️‍♀️ ${username} just finished a new workout 🏋` }, config)

        //I just added this. Maybe not necessary
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;

        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        await web.views.publish(homepage(passUser, allWorkouts))

        return Promise.resolve({
            "response_action": "clear"
        })

    } catch (err) {
        console.error(err.message);
    }
});


slackInteractions.viewSubmission('selected_program_workouts', async (payload, respond) => {
    try {
        console.log("What the hell");
        const metadata = JSON.parse(payload.view.private_metadata);
        const { id } = metadata;
        //id is workoutId

        const data = {
            minutes: payload.view.state.values.minutes.minutes.value,
            seconds: payload.view.state.values.seconds.seconds.value
        }
        const username = payload.user.username;
        const user_id = payload.user.id;
        console.log("\n\n\nuser_id: ", user_id)

        const sendWorkout = await axios.post(`${urlString}/programs/selectedProgram/enter-score/${user_id}/${id}`, data);

        //Taken from 'edit_workout' viewSubmission above

        // const updated = await updatedProgramWorkouts(viewId, user_id);
        // web.views.update(updated)
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        console.log("Am I here?");
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        await web.views.publish(homepage(passUser, allWorkouts));

        return Promise.resolve({
            "response_action": "clear"
        })

    } catch (err) {
        console.error(err.message);
    }
})






module.exports = {
    middleware: slackInteractions.expressMiddleware()
}