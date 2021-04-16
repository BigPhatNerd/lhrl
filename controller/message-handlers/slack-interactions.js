const slackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const homepage = require('../homepage/homeview.js');
const { User, Workout, Program, WeeklyGoal, FinishedWorkout, Session, CrossFit, OAuth } = require('../../models/');
const editWorkoutResponse = require('../responses/successful-edit');
const updatedWorkouts = require('../modals/createWorkout/updatedWorkouts.js');
const updatedCompletedWorkouts = require('../modals/completedWorkouts/updatedCompletedWorkouts');
const updatedProgramWorkouts = require('../modals/selectedProgram/updatedProgramWorkouts.js')
const updatedCalendarWorkouts = require('../modals/calendar/updateCalendar')
const { slack, sugarwod, url } = require('../../lib/keys');
const homeModal = require('../homepage/homeModal');
const updateHomeModal = require('../homepage/updateHomeModal');
const axios = require('axios');
const config = { 'Content-Type': 'application/json' };
const sugarWodConfig = { 'Authorization': sugarwod.sugarwodKey };
const urlString = process.env.NODE_ENV === "production" ? "https://www.lhrlapp.com" : url.development;


var viewId;
var value;

//
//CREATE WORKOUT 

slackInteractions.viewSubmission('create_workout', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
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

        // const confirm = await axios.post(findToken.webhook, { "text": `🏋️‍♀️ ${passUser.real_name} just created a new workout 🏋` }, config);


        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;

        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        if(home_or_slash === "slash") {

            const updatedWorkouts = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])
            webAPI.views.update(updatedWorkouts);
            return
        }

        const updateHome = await homepage(passUser, allWorkouts, wod[0])
        await webAPI.views.publish(updateHome);

    } catch (err) {
        console.error(err.message);
    }

});

// EDIT WORKOUT in createWorkouts/editWorkout.js

slackInteractions.viewSubmission('edit_created_workout', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);

        const metadata = JSON.parse(payload.view.private_metadata);
        const { id, score_type, home_or_slash } = metadata;

        const username = payload.user.username;
        const user_id = payload.user.id;

        var data;
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;
        var { name, description, type } = payload.view.state.values;

        type = type.edit.selected_option == null ? payload.view.blocks[0].accessory.placeholder.text : type.edit.selected_option.value;

        description = description.description.value;
        name = name.name.value;
        data = {
            type: type,
            name: name,
            description: description,
        }
        const sendWorkout = await axios.put(`${urlString}/slack/edit-workout/${id}`, data);
        const workouts = await axios.get(`${urlString}/slack/get-workouts/${user_id}`)
        if(home_or_slash === "slash") {
            const updated = await updatedWorkouts(payload, payload.view.previous_view_id, workouts, "slash");
            webAPI.views.update(updated)
            return
        }
        const updated = await updatedWorkouts(payload, payload.view.previous_view_id, workouts, "home");
        webAPI.views.update(updated)
        return
    } catch (err) {
        console.error(err.message);
    }
});

// COMPLETE WORKOUT
slackInteractions.viewSubmission('complete_workout', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
        const metadata = JSON.parse(payload.view.private_metadata);
        console.log("metadata: ", metadata)
        const { score_type, name, description, home_or_slash, homeModal_view_id, action } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
        var data;
        var { minutes, seconds, rounds, reps, weight, miles, meters, notes } = payload.view.state.values;
        console.log(" here?");
        if(score_type === "Reps") {
            reps = reps.reps.value || 0;
            let isReps = /^\d+$/.test(reps);
            console.log({isReps});
            console.log({reps});
            if(!isReps && reps !== 0) {

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
                name: name,
                description: description,
                reps: parseInt(reps),
                notes: notes
            }
        } else if(score_type === "Rounds + Reps") {
            rounds = rounds.rounds.value || 0;
            reps = reps.reps.value || 0;
            let isRounds = /^\d+$/.test(rounds);
            if(!isRounds && rounds !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        rounds: "Must enter an integer"
                    }
                })
            }

            let isReps = /^\d+$/.test(reps);
            if(!isReps && reps !== 0) {

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
                name: name,
                description: description,
                rounds: parseInt(rounds),
                reps: parseInt(reps),
                notes: notes
            }
        } else if(score_type === "Time") {
            minutes = minutes.minutes.value || 0;
            seconds = seconds.seconds.value || 0;
            let isMin = /^\d+$/.test(minutes);
            if(!isMin && minutes !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        minutes: "Must enter an integer"
                    }
                })
            }
            let isSec = /^\d+$/.test(seconds);
            if(!isSec && seconds !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        seconds: "Must enter an integer"
                    }
                })
            }
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
            let isWeight = /^\d+$/.test(weight);
            if(!isWeight && weight !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        weight: "Must enter an integer"
                    }
                })
            }
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
            let isMiles = /^[1-9]\d*(\.\d+)?$/.test(miles);
            if(!isMiles && miles !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        meters: "Must enter an number"
                    }
                })
            }
            notes = notes.notes.value || "No notes provided.";
            data = {
                type: score_type,
                name: name,
                description: description,
                miles: parseInt(miles),
                notes: notes
            }
        } else if(score_type === "Meters") {
            meters = meters.meters.value || 0;
            let isMeters = /^\d+$/.test(meters);
            if(!isMeters && meters !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        meters: "Must enter an integer"
                    }
                })
            }
            notes = notes.notes.value || "No notes provided.";
            data = {
                type: score_type,
                name: name,
                description: description,
                meters: parseInt(meters),
                notes: notes
            }
        } else if(score_type === "Other") {


            notes = notes.notes.value;
            data = {
                type: score_type,
                name: title,
                description: description,
                notes: notes
            }
        }
        const radioButton = payload.view.state.values.radio['radio_buttons-action'].selected_option.value;


        const sendWorkout = await axios.post(`${urlString}/finishedWorkouts/${user_id}`, data);
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;
        if(radioButton === "public") {
            const webhook = process.env.NODE_ENV === "production" ? findToken.webhook : slack.dev_lhrl_Webhook;
            const confirm = await axios.post(webhook, { "text": `🏋️‍♀️ ${passUser.real_name} just finished a new workout 🏋` }, config)
        }

        if(home_or_slash === "slash") {
            if(action === "complete_completed_workouts") {
                const workouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)
                console.log("payload in complete workout: ", payload);
                const updated = await (updatedCompletedWorkouts(payload, payload.view.previous_view_id, workouts, "slash"))
                webAPI.views.update(updated)
                return
            }

            const workouts = await axios.get(`${urlString}/slack/get-workouts/${user_id}`);
            const updated = await updatedWorkouts(payload, payload.view.previous_view_id, workouts, "slash")
            webAPI.views.update(updated)
            return
        }
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        const showHome = await homepage(passUser, allWorkouts, wod[0]);
        return webAPI.views.publish(showHome);



    } catch (err) {
        console.error(err.message);
    }
});

// EDIT WORKOUT in completedWorkouts/editCompletedWorkouts
slackInteractions.viewSubmission('edit_completed_workout', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
        const metadata = JSON.parse(payload.view.private_metadata);
        const { id, score_type, home_or_slash } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
        var data;
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;
        var { minutes, seconds, rounds, reps, weight, notes, name, miles, meters, description } = payload.view.state.values;

        if(score_type === "Reps") {

            reps = reps.reps.value || 0;
            let isReps = /^\d+$/.test(reps);
            if(!isReps && reps !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        reps: "Must enter an integer"
                    }
                })
            }
            notes = notes.notes.value || "No notes provided.";
            description = description.description.value || "No description provided.";
            name = name.name.value;
            data = {
                type: score_type,
                name: name,
                description: description,
                reps: parseInt(reps),
                notes: notes
            }
        } else if(score_type === "Rounds + Reps") {
            rounds = rounds.rounds.value || 0;
            reps = reps.reps.value || 0;
            let isRounds = /^\d+$/.test(rounds);
            if(!isRounds && rounds !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        rounds: "Must enter an integer"
                    }
                })
            }

            let isReps = /^\d+$/.test(reps);
            if(!isReps && reps !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        reps: "Must enter an integer"
                    }
                })
            }
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
            let isMin = /^\d+$/.test(minutes);
            if(!isMin && minutes !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        minutes: "Must enter an integer"
                    }
                })
            };
            let isSec = /^\d+$/.test(seconds);
            if(!isSec && seconds !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        seconds: "Must enter an integer"
                    }
                })
            };
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
            let isWeight = /^\d+$/.test(weight);
            if(!isWeight && weight !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        weight: "Must enter an integer"
                    }
                })
            }
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
        } else if(score_type === "Distance") {
            miles = miles.miles.value || 0;
            let isMiles = /^[1-9]\d*(\.\d+)?$/.test(miles);
            if(!isMiles && miles !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        meters: "Must enter an number"
                    }
                })
            }
            notes = notes.notes.value || "No notes provided.";
            data = {
                type: score_type,
                name: name,
                description: description,
                miles: parseInt(miles),
                notes: notes
            }
        } else if(score_type === "Meters") {
            meters = meters.meters.value || 0;
            let isMeters = /^\d+$/.test(meters);
            if(!isMeters && meters !== 0) {

                return Promise.resolve({
                    response_action: "errors",
                    errors: {
                        meters: "Must enter an integer"
                    }
                })
            }
            notes = notes.notes.value || "No notes provided.";
            data = {
                type: score_type,
                name: name,
                description: description,
                meters: parseInt(meters),
                notes: notes
            }
        } else if(score_type === "Other") {
            notes = notes.notes.value || "No notes provided."
            data = {
                type: score_type,
                name: title,
                description: description,
                notes: notes
            }
        }

        const sendWorkout = await axios.put(`${urlString}/finishedWorkouts/edit/${id}`, data);
        const workouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)
        console.log("home_or_slash: ", home_or_slash);
        if(home_or_slash === "slash") {
            const updated = await updatedCompletedWorkouts(payload, payload.view.previous_view_id, workouts, "slash");
            webAPI.views.update(updated)
            return
        }

        const updated = await updatedCompletedWorkouts(payload, payload.view.previous_view_id, workouts, "home");
        webAPI.views.update(updated)
    } catch (err) {
        console.error(err.message);
    }
});

//IN THE CALENDAR
// COMPLETE CALENDAR WORKOUT
slackInteractions.viewSubmission('calendar_workout', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);

        const metadata = JSON.parse(payload.view.private_metadata);
        console.log("metadata: ", metadata)
        const { score_type, name, description, home_or_slash, homeModal_view_id, action } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
        var data;
        var { minutes, seconds, rounds, reps, weight, miles, meters, notes } = payload.view.state.values;
        console.log(" here?");
        if(score_type === "Reps") {
            reps = reps.reps.value || 0;
            notes = notes.notes.value || "No notes provided.";
            data = {
                type: score_type,
                name: name,
                description: description,
                reps: parseInt(reps),
                notes: notes
            }
        } else if(score_type === "Rounds + Reps") {
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
        } else if(score_type === "Meters") {
            meters = meters.meters.value || 0;
            notes = notes.notes.value || "No notes provided.";
            data = {
                type: score_type,
                name: name,
                description: description,
                meters: parseInt(meters),
                notes: notes
            }
        } else if(score_type === "Other") {


            notes = notes.notes.value;
            data = {
                type: score_type,
                name: title,
                description: description,
                notes: notes
            }
        }
        const radioButton = payload.view.state.values.radio['radio_buttons-action'].selected_option.value;


        const sendWorkout = await axios.post(`${urlString}/finishedWorkouts/${user_id}`, data);
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;
        if(radioButton === "public") {
            const webhook = process.env.NODE_ENV === "production" ? findToken.webhook : slack.dev_lhrl_Webhook;
            const confirm = await axios.post(webhook, { "text": `🏋️‍♀️ ${passUser.real_name} just finished a new workout 🏋` }, config)
        }

        if(home_or_slash === "slash") {

            const workouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)
            console.log("payload in complete workout: ", payload);
            const updated = await (updatedCalendarWorkouts(payload, payload.view.previous_view_id, workouts, "slash"))
            webAPI.views.update(updated)
            return


            // const workouts = await axios.get(`${urlString}/slack/get-workouts/${user_id}`);
            // const updated = await updatedWorkouts(payload, payload.view.previous_view_id, workouts, "slash")
            // webAPI.views.update(updated)
            // return
        }
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        const showHome = await homepage(passUser, allWorkouts, wod[0]);
        return webAPI.views.publish(showHome);



    } catch (err) {
        console.error(err.message);
    }
});

// EDIT WORKOUT in calendarWorkouts/editCalendardWorkouts
slackInteractions.viewSubmission('edit_calendar_workout', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
        const metadata = JSON.parse(payload.view.private_metadata);
        const { id, score_type, home_or_slash } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
        var data;
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;
        var { minutes, seconds, rounds, reps, weight, notes, name, miles, meters, description } = payload.view.state.values;

        if(score_type === "Reps") {

            reps = reps.reps.value || 0;
            notes = notes.notes.value || "No notes provided.";
            description = description.description.value || "No description provided.";
            name = name.name.value;
            data = {
                type: score_type,
                name: name,
                description: description,
                reps: parseInt(reps),
                notes: notes
            }
        } else if(score_type === "Rounds + Reps") {
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
        } else if(score_type === "Meters") {
            meters = meters.meters.value || 0;
            notes = notes.notes.value || "No notes provided.";
            data = {
                type: score_type,
                name: name,
                description: description,
                meters: parseInt(meters),
                notes: notes
            }
        } else if(score_type === "Other") {
            notes = notes.notes.value || "No notes provided."
            data = {
                type: score_type,
                name: title,
                description: description,
                notes: notes
            }
        }

        const sendWorkout = await axios.put(`${urlString}/finishedWorkouts/edit/${id}`, data);
        const workouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)
        console.log("home_or_slash: ", home_or_slash);
        if(home_or_slash === "slash") {
            const updated = await updatedCalendarWorkouts(payload, payload.view.previous_view_id, workouts, "slash");
            webAPI.views.update(updated)
            return
        }

        const updated = await updatedCalendarWorkouts(payload, payload.view.previous_view_id, workouts, "home");
        webAPI.views.update(updated)
    } catch (err) {
        console.error(err.message);
    }
});


//5k MODAL SUBMISSION
slackInteractions.viewSubmission('subscribe_to_5k', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
        const metadata = JSON.parse(payload.view.private_metadata);
        const { distance, home_or_slash, homeModal_view_id } = metadata;
        const date = payload.view.state.values.date.date.selected_date;
        const user_id = payload.user.id;
        const username = payload.user.username;

        const subscribe = await axios.post(`${urlString}/programs/selectedProgram/subscribe/${user_id}/${distance}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        if(home_or_slash === "slash") {

            const update = updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0]);
            webAPI.views.update(update)
        } else {
            const updateHome = homepage(passUser, allWorkouts, wod[0])
            webAPI.views.publish(updateHome);
        }
        const radioButton = payload.view.state.values.radio['radio_buttons-action'].selected_option.value;
        if(radioButton === "public") {
            const webhook = process.env.NODE_ENV === "production" ? findToken.webhook : slack.dev_lhrl_Webhook;
            const confirm = await axios.post(webhook, { "text": `🏃‍♀️ ${passUser.real_name} just signed up for the 5k program 🏃‍♂️` }, config)
        }
        return
    } catch (err) {
        console.error(err.message);
    }
});

//10K MODAL SUBMISSION

slackInteractions.viewSubmission('subscribe_to_10k', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
        const metadata = JSON.parse(payload.view.private_metadata);
        const { distance, home_or_slash, homeModal_view_id } = metadata;

        const user_id = payload.user.id;
        const date = payload.view.state.values.date.date.selected_date;
        const username = payload.user.username;
        const subscribe = await axios.post(`${urlString}/programs/selectedProgram/subscribe/${user_id}/${distance}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        if(home_or_slash === "slash") {
            const update = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])

            webAPI.views.update(update);

        } else {
            const updateHome = await homepage(passUser, allWorkouts, wod[0]);
            webAPI.views.publish(updateHome);
        }
        const radioButton = payload.view.state.values.radio['radio_buttons-action'].selected_option.value;
        if(radioButton === "public") {
            const webhook = process.env.NODE_ENV === "production" ? findToken.webhook : slack.dev_lhrl_Webhook;
            const confirm = await axios.post(webhook, { "text": `🏃‍♀️ ${passUser.real_name} just signed up for the 10k program 🏃‍♂️` }, config)
        }
        return
    } catch (err) {
        console.error(err.message);
    }
});

//Half-marathon modal submission
slackInteractions.viewSubmission('subscribe_to_half_marathon', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
        const metadata = JSON.parse(payload.view.private_metadata);
        const { distance, home_or_slash, homeModal_view_id } = metadata;

        const user_id = payload.user.id;
        const date = payload.view.state.values.date.date.selected_date;
        const username = payload.user.username;
        const subscribe = await axios.post(`${urlString}/programs/selectedProgram/subscribe/${user_id}/${distance}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        if(home_or_slash === "slash") {
            const update = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])

            webAPI.views.update(update);

        } else {
            const updateHome = await homepage(passUser, allWorkouts, wod[0]);
            webAPI.views.publish(updateHome);
        }
        const radioButton = payload.view.state.values.radio['radio_buttons-action'].selected_option.value;
        if(radioButton === "public") {
            const webhook = process.env.NODE_ENV === "production" ? findToken.webhook : slack.dev_lhrl_Webhook;
            const confirm = await axios.post(webhook, { "text": `🏃‍♀️ ${passUser.real_name} just signed up for the half-marathon program 🏃‍♂️` }, config)
        }
        return
    } catch (err) {
        console.error(err.message);
    }
});

//Marathon modal submission
slackInteractions.viewSubmission('subscribe_to_marathon', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
        const metadata = JSON.parse(payload.view.private_metadata);
        const { distance, home_or_slash, homeModal_view_id } = metadata;

        const user_id = payload.user.id;
        const date = payload.view.state.values.date.date.selected_date;
        const username = payload.user.username;
        const subscribe = await axios.post(`${urlString}/programs/selectedProgram/subscribe/${user_id}/${distance}`, { startDate: date });
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        if(home_or_slash === "slash") {
            const update = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])

            webAPI.views.update(update);

        } else {
            const updateHome = await homepage(passUser, allWorkouts, wod[0]);
            webAPI.views.publish(updateHome);
        }
        const radioButton = payload.view.state.values.radio['radio_buttons-action'].selected_option.value;
        if(radioButton === "public") {
            const webhook = process.env.NODE_ENV === "production" ? findToken.webhook : slack.dev_lhrl_Webhook;
            const confirm = await axios.post(webhook, { "text": `🏃‍♀️ ${passUser.real_name} just signed up for the marathon program 🏃‍♂️` }, config)
        }
        return
    } catch (err) {
        console.error(err.message);
    }
});







//??
slackInteractions.viewSubmission('view_workouts', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
        console.log("payload: ", payload);
        console.log("\n\n\n\n\n DO I NEED TO ADD A SLASH OR HOME HERE!!");
        console.log("payload: ", payload.view.blocks.length);
        //TEST THIS
        const metadata = JSON.parse(payload.view.private_metadata);
        const { home_or_slash, homeModal_view_id } = metadata;
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        const wod = await CrossFit.find().limit(1).sort({ date: -1 });
        if(home_or_slash === "slash") {
            const update = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])

            webAPI.views.update(update);
            return
        } else {
            const updateHome = await homepage(passUser, allWorkouts, wod[0]);
            webAPI.views.publish(updateHome);
            return
        }
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }

});





// SUBMIT for Selected Program Modal selectedProgram/submitTime.js
slackInteractions.viewSubmission('selected_program_workouts', async (payload, respond) => {
    try {
        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
        const metadata = JSON.parse(payload.view.private_metadata);
        console.log("metadata: ", metadata);
        var { minutes, seconds, miles, notes } = payload.view.state.values;
        const { id, home_or_slash, homeModal_view_id, enter_score_slash, score_type } = metadata;
        //id is workoutId
        var data;
        console.log("\n\n\n\nIs this the right place?")
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
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;
        const radioButton = payload.view.state.values.radio['radio_buttons-action'].selected_option.value;
        if(radioButton === "public") {
            const webhook = process.env.NODE_ENV === "production" ? findToken.webhook : slack.dev_lhrl_Webhook;
            const confirm = await axios.post(webhook, { "text": `🏃‍♀️ ${passUser.real_name} just finished a program workout 🏃‍♂️` }, config);
        }
        if(enter_score_slash === "yes") {


            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);

            const wod = await CrossFit.find().limit(1).sort({ date: -1 });
            webAPI.views.update(updateHomeModal(payload.view.root_view_id, passUser, allWorkouts, wod[0]))
            return
        }
        const workouts = await axios.get(`${urlString}/programs/selectedProgram/get-workouts/${user_id}`);
        if(home_or_slash === "slash") {
            console.log("payload: ", payload);
            console.log("viewId: ", viewId)
            const updated = await updatedProgramWorkouts(payload, payload.view.previous_view_id, workouts, "slash");
            webAPI.views.update(updated)
            return
        }
        const updated = await updatedProgramWorkouts(payload, payload.view.previous_view_id, workouts, "home");
        webAPI.views.update(updated)



    } catch (err) {
        console.error(err.message);
    }
})






module.exports = {
    middleware: slackInteractions.expressMiddleware()
}