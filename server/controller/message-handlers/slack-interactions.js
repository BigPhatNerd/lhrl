const slackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const createWorkout = require('../forms/createWorkout.js');
const viewWorkouts = require('../forms/viewWorkouts.js');
const editWorkout = require('../forms/editWorkout');
const homepage = require('../homepage/homeview.js');
const { User, Workout } = require('../../models/');
const axios = require('axios');

var viewId;


slackInteractions.viewSubmission('create_form', async (payload, respond) => {
    try {
        console.log("We are hitting here!");
        const { trigger_id } = payload;
        web.views.open(createWorkout(trigger_id))
        console.log("payload: ", payload);
        return
    } catch (err) {
        console.error(err.message);
    }

});

//buttons pressed from the homepage view
slackInteractions.action({ type: 'button' }, async (payload, respond) => {

    try {
        var buttonPressed = payload.actions[0].action_id;

        const workoutSelected = await Workout.find({ _id: buttonPressed });
        console.log("buttonPressed: ", buttonPressed);
        console.log("payload: ", payload);
        viewId = payload.container.view_id;
        var { trigger_id } = payload;
        var username = payload.user.username;

        if(buttonPressed === "save_workout") {
            web.views.open(createWorkout(trigger_id));
        } else if(buttonPressed === "view_workout") {


            const workoutIndex = await viewWorkouts(trigger_id, username);
            //this is what I want to update!!
            console.log("viewId: ", viewId);
            web.views.open(workoutIndex);
        } else if(buttonPressed === String(workoutSelected[0]._id)) {
            web.views.push(editWorkout(trigger_id, workoutSelected[0]));
        }
    } catch (err) {
        console.error(err.message);
    }
});

slackInteractions.viewSubmission('edit_workout', async (payload, respond) => {
    try {

        const workoutId = payload.view.private_metadata;
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
        web.views.update({
            view_id: viewId,
            view: {
                type: 'modal',
                callback_id: 'view_identifier',
                title: {
                    type: 'plain_text',
                    text: 'Modal title'
                },
                blocks: [{
                    type: 'section',
                    text: {
                        type: 'plain_text',
                        text: 'An updated modal, indeed'
                    }
                }]
            }
        })
    } catch (err) {

        console.error(err.message);

    }
})

slackInteractions.viewSubmission('create_workout', async (payload, respond) => {
    try {
        const params = payload.user.username;
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
        const sendWorkout = await axios.post(`http://lhrlslacktest.ngrok.io/slack/create-workout/${params}`, data);
    } catch (err) {
        console.error(err.message);
    }

});






module.exports = {
    middleware: slackInteractions.expressMiddleware()
}