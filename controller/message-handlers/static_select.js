const axios = require('axios');
const static_select = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const view5KProgram = require('../modals/fiveK/viewProgram');
const view10KProgram = require('../modals/tenK/viewProgram');
const createWorkoutModal = require('../modals/createWorkout/createWorkoutModal');
const viewWorkouts = require('../modals/createWorkouts/viewWorkouts.js');
const viewFinishedWorkouts = require('../modals/completedWorkouts/viewCompletedWorkouts');
const { User, Workout, Program, WeeklyGoal, FinishedWorkout, Session, CrossFit } = require('../../models/');
const { url } = require('../../lib/keys');
const urlString = process.env.NODE_ENV === "production" ? "https://immense-shelf-69979.herokuapp.com" : url.development;

static_select.action({ type: "static_select" }, async (payload, respond) => {
    try {
        var user_id = payload.user.id;
       const value = payload.actions[0].selected_option.value;

        //SELECT WORKOUT TYPE  to create a workout
        if(value === "reps" || value === "rounds_plus_reps" || value === "time" || value === "load" || value === "distance" || value === "meters") {
            if(payload.view.callback_id === "homepage_modal") {
                console.log("\n\n\ntrigger_id in static select: ", payload);
                const create = await createWorkoutModal(payload, value, "slash");
                web.views.push(create);
                return
            }
console.log("why not working");
console.log({value});
            const create = await createWorkoutModal(payload, value, "home");
            web.views.open(create);
            return

        }
        //VIEW CREATED WORKOUTS to view or create a workout
        else if(value === "view_workout") {
            const workouts = await axios.get(`${urlString}/slack/get-workouts/${user_id}`);
            console.log("payload: ", payload);
            if(payload.view.callback_id === "homepage_modal") {


                const workoutIndex = await viewWorkouts(payload, workouts, "slash");
                web.views.push(workoutIndex);
                return
            }

            const workoutIndex = await viewWorkouts(payload, workouts, "home");
            web.views.open(workoutIndex);
            return
        }

        // VIEW COMPLETED WORKOUTS to view or complete a workout
        else if(value === "completed_workouts") {
            const finishedWorkouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)
            console.log("payload: ", payload);
            if(payload.view.callback_id === "homepage_modal") {

                const finishedWorkoutIndex = await viewFinishedWorkouts(payload, finishedWorkouts, "slash");
                web.views.push(finishedWorkoutIndex);
                return
            }
            const finishedWorkoutIndex = await viewFinishedWorkouts(payload, finishedWorkouts, "home");
            web.views.open(finishedWorkoutIndex);
        }

        //  5K Choose a plan
        else if(value === "5K") {
            const workouts = await axios.get(`${urlString}/programs/selectedProgram/view-program/${value}`);

            if(payload.view.callback_id === "homepage_modal") {
                const fiveKIndex = await view5KProgram(payload, workouts, "slash");
                web.views.push(fiveKIndex);
                return
            }
            const fiveKIndex = await view5KProgram(payload, workouts, "home");
            web.views.open(fiveKIndex);
        }

        // 10K Choose a plan
        else if(value === "10K") {
            const workouts = await axios.get(`${urlString}/programs/selectedProgram/view-program/${value}`);

            if(payload.view.callback_id === "homepage_modal") {
                const tenKIndex = await view10KProgram(payload, workouts, "slash");
                web.views.push(tenKIndex);
                return
            }
            const tenKIndex = await view10KProgram(payload, workouts, "home");
            web.views.open(tenKIndex);
        }
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = {
    middleware: static_select.expressMiddleware()
}



//