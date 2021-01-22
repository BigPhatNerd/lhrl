const axios = require('axios');
const buttons = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');

const roundsPlusRepsModal = require('../modals/createWorkout/roundPlusRepsModal');
const loadModal = require('../modals/createWorkout/loadModal');
const otherModal = require('../modals/createWorkout/otherModal');

const timeModal = require('../modals/createWorkout/timeModal');
const distanceModal = require("../modals/createWorkout/timeModal");
const editWorkout = require('../modals/createWorkouts/editWorkout.js');
const viewFinishedWorkouts = require('../modals/completedWorkouts/viewCompletedWorkouts');
const updatedWorkouts = require('../modals/createWorkouts/updatedWorkouts.js');
const editCompletedWorkout = require('../modals/completedWorkouts/editCompletedWorkouts');
const updatedCompletedWorkouts = require('../modals/completedWorkouts/updatedCompletedWorkouts');
const selectedProgramWorkouts = require('../modals/selectedProgram/selectedProgramWorkouts');
const updateHomeModal = require('../homepage/updateHomeModal');
const homepage = require('../homepage/homeview.js');
const submitTime = require('../modals/selectedProgram/submitTime.js');
const setGoals = require('../modals/weeklyGoals/createGoals');
const updateGoals = require('../modals/weeklyGoals/updateGoals');
const addRepsToGoals = require('../modals/addRepsToGoals');
const submitScore = require('../modals/cfWOD/submitScore');
const { url } = require('../../lib/keys');
const { User, Workout, Program, WeeklyGoal, FinishedWorkout, Session, CrossFit } = require('../../models/');
const urlString = process.env.NODE_ENV === "production" ? "https://immense-shelf-69979.herokuapp.com" : url.development;
//buttons pressed from the homepage view
buttons.action({ type: 'button' }, async (payload, respond) => {

    try {
        var buttonPressed = payload.actions[0].action_id.replace("updated", "");

        value = payload.actions[0].value;
        var text = payload.actions[0].text.text;
        var deleteBlockIdPressed = payload.actions[0].block_id;
        var username = payload.user.username;
        var user_id = payload.user.id;
        if(value === "complete_created_workouts") {
            console.log("line 39 button REDO : ", payload)
            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("complete", "");
            const workoutSelected = await Workout.find({ _id: buttonPressed });
            const metadata = JSON.parse(payload.view.private_metadata);
            const { home_or_slash, homeModal_view_id } = metadata;

            if(workoutSelected[0].type === "Rounds + Reps") {
                if(home_or_slash === "slash") {
                    const modal = await roundsPlusRepsModal(payload, workoutSelected[0], "slash", homeModal_view_id)
                    return web.views.push(modal);

                }
                const modal = await roundsPlusRepsModal(payload, workoutSelected[0], "home", "noModal")
                return web.views.push(modal);
            } else if(workoutSelected[0].type === "Time") {
                if(home_or_slash === "slash") {
                    const modal = await timeModal(payload, workoutSelected[0], "slash", homeModal_view_id)
                    return web.views.push(modal)
                }
                const modal = await timeModal(payload, workoutSelected[0], "home", "noModal")
                return web.views.push(modal);

            } else if(workoutSelected[0].type === "Load") {

                if(home_or_slash === "slash") {
                    const modal = await loadModal(payload, workoutSelected[0], "slash", homeModal_view_id)
                    return web.views.push(modal)
                }
                const modal = await loadModal(payload, workoutSelected[0], "home", "noModal")
                return web.views.push(modal);
            } else if(workoutSelected[0].type === "Other") {

                if(home_or_slash === "slash") {
                    const modal = await otherModal(payload, workoutSelected[0], "slash", homeModal_view_id)
                    return web.views.push(modal)
                }
                const modal = await otherModal(payload, workoutSelected[0], "home", "noModal")
                return web.views.push(modal);

            } else if(workoutSelected[0].type === "Distance") {
                if(home_or_slash === "slash") {
                    const modal = await distanceModal(payload, workoutSelected[0], "slash", homeModal_view_id)
                    return web.views.push(modal)
                }
                const modal = await distanceModal(payload, workoutSelected[0], "home", "noModal")
                return web.views.push(modal);
            }


        } else if(value === "edit_created_workouts") {

            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("delete", "");
            const workoutSelected = await Workout.find({ _id: buttonPressed });
            console.log("workoutSelected: ", workoutSelected);
            const awaitWorkouts = await editWorkout(payload, workoutSelected[0])
            web.views.push(awaitWorkouts);
        } else if(value === "delete_created_workouts") {
            buttonPressed = buttonPressed.replace("delete", "");
            const deleteWorkout = await axios.delete(`${urlString}/slack/delete-workout/${buttonPressed}`);

            const metadata = JSON.parse(payload.view.private_metadata);
            console.log("metadata: ", metadata);
            const { home_or_slash, homeModal_view_id } = metadata;
            const workouts = await axios.get(`${urlString}/slack/get-workouts/${user_id}`)
            const updatedIndex = await (updatedWorkouts(payload.view.id, workouts, user_id, homeModal_view_id))
            web.views.update(updatedIndex);
        } else if(value === "complete_completed_workouts") {
            console.log("what");
            console.log("payload: ", payload);
            const metadata = JSON.parse(payload.view.private_metadata);
            console.log("metadata: ", metadata);
            const { home_or_slash, homeModal_view_id } = metadata;
            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("complete", "");
            const workoutSelected = await FinishedWorkout.find({ _id: buttonPressed });
            //
            //
            if(workoutSelected[0].type === "Rounds + Reps") {
                if(home_or_slash === "slash") {
                    console.log("whatever");
                    const modal = await roundsPlusRepsModal(payload, workoutSelected[0], "slash", homeModal_view_id)
                    return web.views.push(modal);

                }
                const modal = await roundsPlusRepsModal(payload, workoutSelected[0], "home", "noModal")
                return web.views.push(modal);
            } else if(workoutSelected[0].type === "Time") {
                if(home_or_slash === "slash") {
                    const modal = await timeModal(payload, workoutSelected[0], "slash", homeModal_view_id)
                    return web.views.push(modal)
                }
                const modal = await timeModal(payload, workoutSelected[0], "home", "noModal")
                return web.views.push(modal);

            } else if(workoutSelected[0].type === "Load") {

                if(home_or_slash === "slash") {
                    const modal = await loadModal(payload, workoutSelected[0], "slash", homeModal_view_id)
                    return web.views.push(modal)
                }
                const modal = await loadModal(payload, workoutSelected[0], "home", "noModal")
                return web.views.push(modal);
            } else if(workoutSelected[0].type === "Other") {

                if(home_or_slash === "slash") {
                    const modal = await otherModal(payload, workoutSelected[0], "slash", homeModal_view_id)
                    return web.views.push(modal)
                }
                const modal = await otherModal(payload, workoutSelected[0], "home", "noModal")
                return web.views.push(modal);

            } else if(workoutSelected[0].type === "Distance") {
                if(home_or_slash === "slash") {
                    const modal = await distanceModal(payload, workoutSelected[0], "slash", homeModal_view_id)
                    return web.views.push(modal)
                }
                const modal = await distanceModal(payload, workoutSelected[0], "home", "noModal")
                return web.views.push(modal);
            }



        } else if(value === "edit_completed_workouts") {
            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("delete", "");
            const workoutSelected = await FinishedWorkout.find({ _id: buttonPressed });
            web.views.push(editCompletedWorkout(payload, workoutSelected[0]));
        } else if(value === "delete_completed_workouts") {
            buttonPressed = buttonPressed.replace("delete", "");
            const deleteWorkout = await FinishedWorkout.deleteOne({ _id: buttonPressed });
            const workouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)
            const workoutIndex = await updatedCompletedWorkouts(payload.view.id, workouts);
            console.log("WHAT IS UP ON LINE 200")
            web.views.update(workoutIndex);
        } else if(value === "program_workouts") {


            const workouts = await axios.get(`${urlString}/programs/selectedProgram/get-workouts/${user_id}`)
            if(payload.view.callback_id === "homepage_modal") {

                const listWorkouts = await selectedProgramWorkouts(payload, workouts, "slash");
                web.views.push(listWorkouts)
                return
            }
            const listWorkouts = await selectedProgramWorkouts(payload, workouts, "home");
            web.views.open(listWorkouts)
        } else if(value === "remove_workouts") {
            const user = payload.user.id;
            const removePlan = await axios.delete(`${urlString}/programs/selectedProgram/delete-program/${user_id}`);
            const userInfo = await web.users.info({ user: user });
            const passUser = userInfo.user;
            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
            const wod = await CrossFit.find().limit(1).sort({ $natural: -1 });
            if(payload.view.callback_id === "homepage_modal") {

                const update = await updateHomeModal(payload.view.id, passUser, allWorkouts, wod[0])
                web.views.update(update);
                return
            }
            // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
            web.views.publish(homepage(passUser, allWorkouts, wod[0]))
        } else if(value === "selected_program_score") {
            viewId = payload.container.view_id;

            const { home_or_slash, homeModal_view_id } = JSON.parse(payload.view.private_metadata);
            //Open modal to enter score for program workout
            buttonPressed = buttonPressed.replace("selected_program_score", "");
            const workoutSelected = await Program.find({ _id: buttonPressed });
            //RIGHT HERE
            if(home_or_slash === "slash") {

                const submitTimeView = await submitTime(payload, workoutSelected[0], homeModal_view_id, "slash");
                web.views.push(submitTimeView);
            } else {

                const submitTimeView = await submitTime(payload, workoutSelected[0], "homepage", "home");
                web.views.push(submitTimeView);
            }

        } else if(value === 'daily_program_score') {

            buttonPressed = buttonPressed.replace("daily_program_score", "");
            const workoutSelected = await Program.find({ _id: buttonPressed });
            if(payload.view.private_metadata !== "") {
                const metadata = JSON.parse(payload.view.private_metadata);
                const { home_or_slash } = metadata;
                const homeModal_view_id = payload.view.id
                const submitTimeView = await submitTime(payload, workoutSelected[0], homeModal_view_id, "slash", "yes");
                web.views.push(submitTimeView);
                return
            }

            const submitTimeView = await submitTime(payload, workoutSelected[0], "", "home", "no");
            web.views.open(submitTimeView);


            //
        } else if(value === "weekly_goal") {

            if(payload.view.callback_id === "homepage_modal") {

                const goals = await setGoals(payload, "slash");
                web.views.push(goals)
                return
            }
            web.views.open(setGoals(payload, "home"));
        } else if(value === "update_weekly_goal") {
            viewId = payload.container.view_id;

            buttonPressed = buttonPressed.replace("update_weekly_goal", "");
            const goalsSelected = await WeeklyGoal.find({ _id: buttonPressed });
            if(payload.view.callback_id === "homepage_modal") {
                const update = await updateGoals(payload, goalsSelected[0], "slash");
                web.views.push(update);
                return
            }
            const update = await updateGoals(payload, goalsSelected[0], "home")
            web.views.open(update);
        } else if(value === 'add_reps_to_goal') {
            if(payload.view.callback_id === "homepage_modal") {
                const addReps = addRepsToGoals(payload, "slash");

                web.views.push(addReps);
                return
            }

            const addReps = addRepsToGoals(payload, "home");
            web.views.open(addReps);
        } else if(value === 'cf_wod_score') {

            const wod = await CrossFit.find().limit(1).sort({ $natural: -1 });

            if(payload.view.callback_id === "homepage_modal") {

                const score = await submitScore(payload, wod[0], "slash");
                web.views.push(score);
                return
            }
            const score = await submitScore(payload, wod[0], "home");
            web.views.open(score);
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

            const deleteSessions = await Session.deleteMany({});
            const createSession = await Session.create({ userId: id, team_id: team_id, api_app_id: api_app_id });
            const createUser = await User.findOneAndUpdate({ user_id: id }, { $set: { team_id: team_id, user_name: name } }, { upsert: true, new: true });

        } else if(value === 'Deauthorize Strava') {
            const user = payload.user.id;
            const userInfo = await web.users.info({ user: user });

            const passUser = userInfo.user;
            axios.put(`${urlString}/strava/deauth/${passUser.id}`);
            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
            if(payload.view.callback_id === "homepage_modal") {

                const wod = await CrossFit.find().limit(1).sort({ $natural: -1 });
                const update = updateHomeModal(payload.view.root_view_id, passUser, allWorkouts, wod[0]);
                web.views.update(update)
                return
            }
            web.views.publish(homepage(passUser, allWorkouts))
        }
    } catch (err) {
        console.error(err.message);
    }
});


module.exports = {
    middleware: buttons.expressMiddleware()
}





//