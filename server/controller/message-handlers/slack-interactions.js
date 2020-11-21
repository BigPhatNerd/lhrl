const slackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const createWorkout = require('../forms/createWorkout.js');
const viewWorkouts = require('../forms/viewWorkouts.js');
const editWorkout = require('../forms/editWorkout.js');
const homepage = require('../homepage/homeview.js');
const { User, Workout } = require('../../models/');
const editWorkoutResponse = require('../responses/successful-edit');
const updatedWorkouts = require('../forms/updatedWorkouts.js')
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
        var buttonPressed = payload.actions[0].action_id.replace("updated", "");
        buttonPressed = buttonPressed.replace("delete", "");
        var value = payload.actions[0].value;
        var text = payload.actions[0].text.text;
        var deleteBlockIdPressed = payload.actions[0].block_id;
        console.log("payload looking for value: ", payload);

        console.log("value: ", value);

        viewId = payload.container.view_id;
        var { trigger_id } = payload;
        var username = payload.user.username;
        console.log("LINE 40 ");
        if(value === "create_workout") {
            web.views.open(createWorkout(trigger_id));
        } else if(value === "view_workout") {
            console.log("I am being pressed on edit");
            const workouts = await axios.get(`https://lhrlslacktest.ngrok.io/slack/get-workouts/${username}`)
            const workoutIndex = await viewWorkouts(trigger_id, workouts);
            //this is what I want to update!!
            console.log("viewId: ", viewId);
            web.views.open(workoutIndex);
        } else if(text === "Edit Workout") {
            console.log("this shit is working!!");
            const workoutSelected = await Workout.find({ _id: buttonPressed });
            // editValuePressed === String(workoutSelected[0]._id)
            console.log("LINE 51");
            web.views.push(editWorkout(trigger_id, workoutSelected[0]));
        } else if(text === "Delete Workout") {
            console.log("KILLING IT HOMIES. DELETE THAT ISH!!");
            const deleteWorkout = await axios.delete(`https://lhrlslacktest.ngrok.io/slack/delete-workout/${buttonPressed}`);
            const workouts = await axios.get(`https://lhrlslacktest.ngrok.io/slack/get-workouts/${username}`)
            const workoutIndex = await viewWorkouts(trigger_id, workouts);
            web.views.push(workoutIndex);
        }
    } catch (err) {
        console.error(err.message);
    }
});

slackInteractions.viewSubmission('edit_workout', async (payload, respond) => {
    try {
        console.log("edit workout was hit!");
        console.log("payload in edit: ", payload)
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