const slackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const createWorkout = require('../modals/createWorkouts/createWorkout.js');
const homepage = require('../homepage/homeview.js');
const { User, Workout, Program, WeeklyGoal, FinishedWorkout, Session, CrossFit } = require('../../models/');
const editWorkoutResponse = require('../responses/successful-edit');
const updatedWorkouts = require('../modals/createWorkouts/updatedWorkouts.js');
const updatedCompletedWorkouts = require('../modals/completedWorkouts/updatedCompletedWorkouts');
const updatedProgramWorkouts = require('../modals/selectedProgram/updatedProgramWorkouts.js')

const { slack, sugarwod, url } = require('../../lib/keys');
const homeModal = require('../homepage/homeModal');
const updateHomeModal = require('../homepage/updateHomeModal');
const axios = require('axios');
const config = { 'Content-Type': 'application/json' };
const sugarWodConfig = { 'Authorization': sugarwod.sugarwodKey };
const urlString = process.env.NODE_ENV === "production" ? "https://immense-shelf-69979.herokuapp.com" : url.development;
const lhrlWebhook = process.env.NODE_ENV === "production" ? slack.lhrl_Webhook : slack.dev_lhrl_Webhook;

var viewId;
var value;

//5k MODAL SUBMISSION
slackInteractions.viewSubmission('subscribe_to_5k', async (payload, respond) => {
    try {
        const metadata = JSON.parse(payload.view.private_metadata);
        const { distance, home_or_slash, homeModal_view_id } = metadata;
        const date = payload.view.state.values.date.date.selected_date;
        const user_id = payload.user.id;
        const username = payload.user.username;

        const subscribe = await axios.post(`${urlString}/programs/selectedProgram/subscribe/${user_id}/${distance}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ $natural: -1 });
        if(home_or_slash === "slash") {

            const update = updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0]);
            web.views.update(update)
        } else {
            const updateHome = homepage(passUser, allWorkouts, wod[0])
            web.views.publish(updateHome);
        }
        // const confirm = await axios.post(lhrlWebhook, { "text": `🏃‍♀️ ${username} just signed up for the 5k program 🏃‍♂️` }, config)
        return
    } catch (err) {
        console.error(err.message);
    }
});

//10K MODAL SUBMISSION

slackInteractions.viewSubmission('subscribe_to_10k', async (payload, respond) => {
    try {
        const metadata = JSON.parse(payload.view.private_metadata);
        const { distance, home_or_slash, homeModal_view_id } = metadata;

        const user_id = payload.user.id;
        const date = payload.view.state.values.date.date.selected_date;
        const username = payload.user.username;
        const subscribe = await axios.post(`${urlString}/programs/selectedProgram/subscribe/${user_id}/${value}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ $natural: -1 });
        if(home_or_slash === "slash") {
            const update = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])

            web.views.update(update);
        } else {
            const updateHome = await homepage(passUser, allWorkouts, wod[0]);
            web.views.publish(updateHome);
        }
        // const confirm = await axios.post(lhrlWebhook, { "text": `🏃‍♀️ ${username} just signed up for the 10k program 🏃‍♂️` }, config)
        return
    } catch (err) {
        console.error(err.message);
    }
});

// EDIT WORKOUT in createWorkouts/editWorkout.js

slackInteractions.viewSubmission('edit_created_workout', async (payload, respond) => {
    try {


        const metadata = JSON.parse(payload.view.private_metadata);
        const { id, score_type, homeModal_view_id } = metadata;

        const username = payload.user.username;
        const user_id = payload.user.id;

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
        const workouts = await axios.get(`${urlString}/slack/get-workouts/${user_id}`)
        const updated = await updatedWorkouts(payload.view.previous_view_id, workouts, passUser.id, homeModal_view_id);
        web.views.update(updated)
    } catch (err) {
        console.error(err.message);
    }
});

// EDIT WORKOUT in completedWorkouts/editCompletedWorkouts
slackInteractions.viewSubmission('edit_completed_workout', async (payload, respond) => {
    try {
        const metadata = JSON.parse(payload.view.private_metadata);
        const { id, score_type } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
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

        const sendWorkout = await axios.put(`${urlString}/finishedWorkouts/edit/${id}`, data);
        const workouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)

        const updated = await updatedCompletedWorkouts(payload.view.previous_view_id, workouts);
        web.views.update(updated)
    } catch (err) {
        console.error(err.message);
    }
});

//??
slackInteractions.viewSubmission('view_workouts', async (payload, respond) => {

    console.log("payload: ", payload.view.blocks.length);


});


//CREATE WORKOUT 

slackInteractions.viewSubmission('create_workout', async (payload, respond) => {
    try {
        const metadata = JSON.parse(payload.view.private_metadata);
        const { score_type, homeModal_view_id, home_or_slash } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
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

        // const confirm = await axios.post(lhrlWebhook, { "text": `🏋️‍♀️ ${username} just created a new workout 🏋` }, config);
        return

        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;

        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ $natural: -1 });
        if(home_or_slash === "slash") {


            console.log("homeModal_view_id: ", homeModal_view_id);
            console.log("root id: ", payload.view.root_view_id)

            const updatedWorkouts = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])
            web.views.update(updatedWorkouts);
            return
        }

        const updateHome = await homepage(passUser, allWorkouts, wod[0])
        await web.views.publish(updateHome);

    } catch (err) {
        console.error(err.message);
    }

});

// COMPLETE WORKOUT
slackInteractions.viewSubmission('complete_workout', async (payload, respond) => {
    try {

        const metadata = JSON.parse(payload.view.private_metadata);
        console.log("metadata: ", metadata)
        const { score_type, name, description, home_or_slash, homeModal_view_id, action } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
        var data;
        var { minutes, seconds, rounds, reps, weight, miles, notes } = payload.view.state.values;
        console.log(" here?");
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
        // const confirm = await axios.post(lhrlWebhook, { "text": `🏋️‍♀️ ${username} just finished a new workout 🏋` }, config)
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;

        console.log("home_or_slash: ", home_or_slash);
        if(home_or_slash === "slash") {
            if(action === "complete_completed_workouts") {
                const workouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)

                const updated = await (updatedCompletedWorkouts(payload.view.previous_view_id, workouts))
                web.views.update(updated)
                return
            }
            console.log("YOUOU");
            const wod = await CrossFit.find().limit(1).sort({ $natural: -1 });
            console.log("wod: ", wod);
            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
            const updatedWorkouts = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])
            web.views.update(updatedWorkouts);
            return
        }
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ $natural: -1 });
        const showHome = await homepage(passUser, allWorkouts, wod[0]);
        return web.views.publish(showHome);



    } catch (err) {
        console.error(err.message);
    }
});

// SUBMIT for Selected Program Modal selectedProgram/submitTime.js
slackInteractions.viewSubmission('selected_program_workouts', async (payload, respond) => {
    try {

        const metadata = JSON.parse(payload.view.private_metadata);
        var { minutes, seconds, miles, notes } = payload.view.state.values;
        const { id, home_or_slash, homeModal_view_id, enter_score_slash, score_type } = metadata;
        //id is workoutId
        var data;
        if(score_type === "Time") {
            minutes = minutes.minutes.value || 0;
            seconds = seconds.seconds.value || 0;
            notes = notes.notes.value || "No notes provided.";

            data = {
                minutes: parseInt(minutes),
                seconds: parseInt(seconds),
                notes: notes


            }
        } else if(score_type === "Distance") {
            miles = miles.miles.value || 0;
            notes = notes.notes.value || "No notes provided.";
            data = {
                miles: parseInt(miles),
                notes: notes
            }
        }
        const username = payload.user.username;
        const user_id = payload.user.id;


        const sendWorkout = await axios.post(`${urlString}/programs/selectedProgram/enter-score/${user_id}/${id}`, data);

        if(enter_score_slash === "yes") {

            const user = payload.user.id;
            const userInfo = await web.users.info({ user: user });
            const passUser = userInfo.user;
            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);

            const wod = await CrossFit.find().limit(1).sort({ $natural: -1 });
            web.views.update(updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0]))
            return
        }
        if(home_or_slash === "slash") {
            const updated = await updatedProgramWorkouts(viewId, user_id, homeModal_view_id, "slash");
            web.views.update(updated)
            return
        }
        const updated = await updatedProgramWorkouts(viewId, user_id, homeModal_view_id, "home");
        web.views.update(updated)



    } catch (err) {
        console.error(err.message);
    }
})






module.exports = {
    middleware: slackInteractions.expressMiddleware()
}