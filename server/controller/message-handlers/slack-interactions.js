const slackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const createWorkout = require('../forms/createWorkout.js');
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

slackInteractions.action({ type: 'button' }, async (payload, respond) => {
    //buttons pressed from the homepage view
    try {
        const { trigger_id } = payload;
        web.views.open(createWorkout(trigger_id));
    } catch (err) {
        console.error(err.message);
    }
});

slackInteractions.viewSubmission('create_workout', async (payload, respond) => {
    try {

        console.log("Are we hitting this one yet?!");
        const { trigger_id } = payload;
        const { name, duration, weight, reps, sets, distance } = payload.view.state.values;
        const data = {
            name: name,
            duration: parseInt(duration),
            weight: parseInt(weight),
            reps: parseInt(reps),
            sets: parseInt(sets),
            distance: parseInt(distance)
        }
        const sendWorkout = await axios.post(`/slack/create-workout/`, data);
        console.log("sendWorkout.data: ", sendWorkout.data);
        console.log("payload.state.values: ", payload.view.state.values);
    } catch (err) {
        console.error(err.message);
    }

})


module.exports = {
    middleware: slackInteractions.expressMiddleware()
}