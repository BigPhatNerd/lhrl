const slackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const createWorkout = require('../forms/createWorkout.js');
const viewWorkouts = require('../forms/viewWorkouts.js');
const homepage = require('../homepage/homeview.js');
const { User, Workout } = require('../../models/');
const axios = require('axios');



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
    var buttonPressed = payload.actions[0].action_id;
    console.log("buttonPressed: ", buttonPressed);
    try {
        var { trigger_id } = payload;
        var username = payload.user.username;

        if(buttonPressed === "save_workout") {
            web.views.open(createWorkout(trigger_id));
        } else if(buttonPressed = "view_workout") {
            const workoutIndex = await viewWorkouts(trigger_id, username);
            web.views.open(workoutIndex);
        }
    } catch (err) {
        console.error(err.message);
    }
});

slackInteractions.viewSubmission('create_workout', async (payload, respond) => {
    try {

        console.log("Are we hitting this one yet?!");
        console.log("payload: ", payload);
        const params = payload.user.username;
        console.log("params: ", params);
        const { trigger_id } = payload;
        var { type, name, duration, weight, reps, sets, distance } = payload.view.state.values;
        console.log("payload.view.state.values: ", payload.view.state.values);

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
        console.log("sendWorkout.data: ", sendWorkout.data);
        console.log("payload.state.values: ", payload.view.state.values);
    } catch (err) {
        console.error(err.message);
    }

});




module.exports = {
    middleware: slackInteractions.expressMiddleware()
}