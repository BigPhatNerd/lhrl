const axios = require('axios');
var dayjs = require("dayjs");
const buttons = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');

const roundsPlusRepsModal = require('../modals/createWorkout/roundPlusRepsModal');
const repsModal = require('../modals/createWorkout/repsModal');

const loadModal = require('../modals/createWorkout/loadModal');
const otherModal = require('../modals/createWorkout/otherModal');
const metersModal = require('../modals/createWorkout/metersModal');
const timeModal = require('../modals/createWorkout/timeModal');
const distanceModal = require("../modals/createWorkout/distanceModal");
const editWorkout = require('../modals/createWorkout/editWorkout.js');
const viewFinishedWorkouts = require('../modals/completedWorkouts/viewCompletedWorkouts');
const viewCalendarWorkouts = require('../modals/calendar/viewCalendar');
const editCalendarWorkout = require('../modals/calendar/editCalendarWorkout');
const updatedCalendarWorkouts = require('../modals/calendar/updateCalendar');
const confirmRemove = require('../modals/confirm');
const stravaChannelSelect = require('../modals/stravaChannelSelect');
const calendarDistance = require('../modals/calendar/calendarDistance');
const calendarLoad = require('../modals/calendar/calendarLoad');
const calendarMeters = require('../modals/calendar/calendarMeters');
const calendarOther = require('../modals/calendar/calendarOther');
const calendarReps = require('../modals/calendar/calendarReps');
const calendarRoundsPlusReps = require('../modals/calendar/calendarRoundsPlusReps');
const calendarTime = require('../modals/calendar/calendarTime');
const updatedWorkouts = require('../modals/createWorkout/updatedWorkouts.js');
const editCompletedWorkout = require('../modals/completedWorkouts/editCompletedWorkouts');
const updatedCompletedWorkouts = require('../modals/completedWorkouts/updatedCompletedWorkouts');
const selectedProgramWorkouts = require('../modals/selectedProgram/selectedProgramWorkouts');
const updatedProgramWorkouts = require('../modals/selectedProgram/updatedProgramWorkouts');
const updateHomeModal = require('../homepage/updateHomeModal');
const homepage = require('../homepage/homeview.js');
const submitTime = require('../modals/selectedProgram/submitTime.js');
const setGoals = require('../modals/weeklyGoals/createGoals');
const sendEmail = require('../modals/sendEmail');
const updateGoals = require('../modals/weeklyGoals/updateGoals');
const addRepsToGoals = require('../modals/addRepsToGoals');
const submitScore = require('../modals/cfWOD/submitScore');
const { url } = require('../../lib/keys');

const { User, Workout, Program, WeeklyGoal, FinishedWorkout, Session, CrossFit, OAuth } = require('../../models/');
const urlString = process.env.NODE_ENV === "production" ? "https://www.lhrlapp.com" : url.development;
//buttons pressed from the homepage view


buttons.action({ type: 'datepicker' }, async (payload, respond) => {
    try {


        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
        const user = payload.user.id;
        const userInfo = await webAPI.users.info({ user: user });
        const passUser = userInfo.user;


        const value = payload.actions[0].action_id;


        if(value === "calendar") {
            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
            if(payload.view.callback_id === "homepage_modal") {

                const calendar = await viewCalendarWorkouts(payload, allWorkouts, "slash");
                webAPI.views.push(calendar);
                return
            }
            const calendar = await viewCalendarWorkouts(payload, allWorkouts, "slash");
            webAPI.views.open(calendar);
            return
        }


        const metadata = JSON.parse(payload.view.private_metadata);
        const { home_or_slash } = metadata;
        const user_id = payload.user.id;
        const workouts = await axios.get(`${urlString}/finishedWorkouts/${user}`)

        if(home_or_slash === "slash") {

            const updated = await updatedCalendarWorkouts(payload, payload.view.id, workouts, "slash");
            webAPI.views.update(updated)
            return
        }

        const updated = await updatedCalendarWorkouts(payload, payload.view.id, workouts, "home");
        webAPI.views.update(updated)


    } catch (err) {

        res.status(500).send('Server Error');
    }
})
buttons.action({ type: 'button' }, async (payload, respond) => {

    try {

        const findToken = await OAuth.findOne({ team_id: payload.team.id });
        const webAPI = web(findToken.access_token);
        var buttonPressed = payload.actions[0].action_id.replace("updated", "");
        value = payload.actions[0].value;
        var text = payload.actions[0].text.text;
        var deleteBlockIdPressed = payload.actions[0].block_id;
        var username = payload.user.username;
        var user_id = payload.user.id;

        //Add this to all public posts
                const findChannels =  await webAPI.conversations.list();
                const publicChannels = findChannels.channels.map(channel =>{
                    if(!channel.is_private){
                        return channel.name
                    }
                })
                publicChannels.unshift("Keep Private 🤫")
           
                //



        // VIEW PROGRAM WORKOUTS
        if(value === "program_workouts") {


            const workouts = await axios.get(`${urlString}/programs/selectedProgram/get-workouts/${user_id}`)
            if(payload.view.callback_id === "homepage_modal") {

                const listWorkouts = await selectedProgramWorkouts(payload, workouts, "slash");
                webAPI.views.push(listWorkouts);
                return
            }
            const listWorkouts = await selectedProgramWorkouts(payload, workouts, "home");
            webAPI.views.open(listWorkouts);
            return
        }
        //pagination for selected program workouts
        else if(value === "selected_program_next" || value === "selected_program_prev") {

            const metadata = JSON.parse(payload.view.private_metadata);
            const { home_or_slash } = metadata;
            const workouts = await axios.get(`${urlString}/programs/selectedProgram/get-workouts/${user_id}`)


            if(home_or_slash === "slash") {
                console.log("Am I here");
                const selectedProgramIndex = await (updatedProgramWorkouts(payload, payload.view.id, workouts, "slash"))

                webAPI.views.update(selectedProgramIndex);
                return
            }
            const selectedProgramIndex = await (updatedProgramWorkouts(payload, payload.view.id, workouts, "home"))
            webAPI.views.update(selectedProgramIndex);
            return
        }
        // ENTER SCORE on today's scheduled workout
        else if(value === 'daily_program_score') {

            buttonPressed = buttonPressed.replace("daily_program_score", "");
            const workoutSelected = await Program.find({ _id: buttonPressed });
            const metadata = JSON.parse(payload.view.private_metadata);
            const { home_or_slash } = metadata;
            console.log("metadata: ", metadata);
            console.log("payload: ", payload);
            if(home_or_slash === "slash") {
                if(payload.view.callback_id === "homepage_modal") {

                    const submitTimeView = await submitTime(payload, workoutSelected[0], "slash", "yes", publicChannels);
                    webAPI.views.push(submitTimeView);
                    return
                }
                const submitTimeView = await submitTime(payload, workoutSelected[0], "slash", "no", publicChannels);
                webAPI.views.push(submitTimeView);
                return

            }

            const submitTimeView = await submitTime(payload, workoutSelected[0], "home", "no", publicChannels);
            webAPI.views.open(submitTimeView);
            return

        }
        //REMOVE PLAN remove me from program
        else if(value === "remove_workouts") {
            console.log({ payload })
            if(payload.view.callback_id === "homepage_modal") {
                const sendConfirm = await confirmRemove(payload, 'slash');
                webAPI.views.push(sendConfirm);
                return

            }
            const sendConfirm = await confirmRemove(payload, 'slash');
            webAPI.views.open(sendConfirm);
            return

        }
        //WEEKLY GOALS add weekly goals
        else if(value === "weekly_goal") {

            if(payload.view.callback_id === "homepage_modal") {

                const goals = await setGoals(payload, "slash", publicChannels);
                webAPI.views.push(goals)
                return
            }
            webAPI.views.open(setGoals(payload, "home", publicChannels));
            return
        }
        //ADD COMPLETED REPS add reps to weekly goals
        else if(value === 'add_reps_to_goal') {
            if(payload.view.callback_id === "homepage_modal") {
                
                const addReps = await addRepsToGoals(payload, "slash", publicChannels);

                webAPI.views.push(addReps);
                return
            }

            const addReps = await addRepsToGoals(payload, "home", publicChannels);
            webAPI.views.open(addReps);
            return
        }
        // UPDATE WEEKLY GOALS 
        else if(value === "update_weekly_goal") {
            viewId = payload.container.view_id;

            buttonPressed = buttonPressed.replace("update_weekly_goal", "");
            const goalsSelected = await WeeklyGoal.find({ _id: buttonPressed });
            if(payload.view.callback_id === "homepage_modal") {
                const update = await updateGoals(payload, goalsSelected[0], "slash", publicChannels);
                webAPI.views.push(update);
                return
            }
            const update = await updateGoals(payload, goalsSelected[0], "home", publicChannels)
            webAPI.views.open(update);
            return
        }

        // ENTER SCORE cf workout of the day
        else if(value === 'cf_wod_score') {
            console.log("\n\n\n\nword\n\n\n\n");
            const wod = await CrossFit.find().limit(1).sort({ date: -1 });

            if(payload.view.callback_id === "homepage_modal") {

                const score = await submitScore(payload, wod[0], "slash", publicChannels);
                webAPI.views.push(score);
                return
            }
            const score = await submitScore(payload, wod[0], "home", publicChannels);
            webAPI.views.open(score);
            return
        }  else if(value === "contact") {
            console.log("I was hit");
console.log({payload})
            if(payload.view?.callback_id === "homepage_modal" || payload.view?.callback_id === 'help') {

                const goals = await sendEmail(payload, "slash");
                webAPI.views.push(goals)
                return
            }

            const email = await sendEmail(payload, "home");
            webAPI.views.open(email);
            return
        }
        //-------------------------------------------------------//
        //Below is all the buttons on pupup modals outside of the homeview and homeviewModal
        //-------------------------------------------------------//


        //COMPLETE WORKOUT viewWorkouts inside of createWorkouts
        else if(value === "complete_created_workouts") {

            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("complete", "");
            const workoutSelected = await Workout.find({ _id: buttonPressed });
            const metadata = JSON.parse(payload.view.private_metadata);
            const { home_or_slash, homeModal_view_id } = metadata;
            console.log("home_or_slash (complete created workouts): ", home_or_slash);
            if(workoutSelected[0].type === "Reps") {
                if(home_or_slash === "slash") {
                    const modal = await repsModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal);
                    return

                }
                const modal = await repsModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return
            } else if(workoutSelected[0].type === "Rounds + Reps") {
                if(home_or_slash === "slash") {
                    const modal = await roundsPlusRepsModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal);
                    return

                }
                const modal = await roundsPlusRepsModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return
            } else if(workoutSelected[0].type === "Time") {
                if(home_or_slash === "slash") {
                    const modal = await timeModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal)
                    return
                }
                const modal = await timeModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return

            } else if(workoutSelected[0].type === "Load") {

                if(home_or_slash === "slash") {
                    const modal = await loadModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal)
                    return
                }
                const modal = await loadModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return
            } else if(workoutSelected[0].type === "Other / Text") {

                if(home_or_slash === "slash") {
                    const modal = await otherModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal)
                    return
                }
                const modal = await otherModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return

            } else if(workoutSelected[0].type === "Distance") {
                if(home_or_slash === "slash") {
                    const modal = await distanceModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal)
                    return
                }
                const modal = await distanceModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return
            } else if(workoutSelected[0].type === "Meters") {
                if(home_or_slash === "slash") {
                    const modal = await metersModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal)
                    return
                }
                const modal = await metersModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return
            }


        }

        // EDIT WORKOUT inside of Workouts Created editWorkout
        else if(value === "edit_created_workouts") {

            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("delete", "");
            const workoutSelected = await Workout.find({ _id: buttonPressed });

            const metadata = JSON.parse(payload.view.private_metadata);
            const { home_or_slash } = metadata;

            if(home_or_slash === "slash") {
                const awaitWorkouts = await editWorkout(payload, workoutSelected[0], "slash")
                webAPI.views.push(awaitWorkouts);
                return
            }
            const awaitWorkouts = await editWorkout(payload, workoutSelected[0], "home")
            webAPI.views.push(awaitWorkouts);
            return
        }
        // DELETE WORKOUT inside of Workouts Created 
        else if(value === "delete_created_workouts") {
            buttonPressed = buttonPressed.replace("delete", "");
            const deleteWorkout = await axios.delete(`${urlString}/slack/delete-workout/${buttonPressed}`);

            const metadata = JSON.parse(payload.view.private_metadata);
            console.log("metadata: ", metadata);
            const { home_or_slash, homeModal_view_id } = metadata;
            const workouts = await axios.get(`${urlString}/slack/get-workouts/${user_id}`);
            if(home_or_slash === "slash") {
                const updatedIndex = await (updatedWorkouts(payload, payload.view.id, workouts, "slash"))
                webAPI.views.update(updatedIndex);
                return
            }
            const updatedIndex = await (updatedWorkouts(payload, payload.view.id, workouts, "home"))
            webAPI.views.update(updatedIndex);
            return
        }

        //Pagination for created workouts
        else if(value === "created_next" || value === "created_prev") {
            console.log("Yeppers");
            const metadata = JSON.parse(payload.view.private_metadata);
            const { home_or_slash } = metadata;
            const workouts = await axios.get(`${urlString}/slack/get-workouts/${user_id}`);


            if(home_or_slash === "slash") {
                console.log("Am I here");
                const updatedIndex = await (updatedWorkouts(payload, payload.view.id, workouts, "slash"))

                webAPI.views.update(updatedIndex);
                return
            }
            const updatedIndex = await (updatedWorkouts(payload, payload.view.id, workouts, "home"))
            webAPI.views.update(updatedIndex);
            return
        }




        //REDO WORKOUT inside viewCompleteWorkouts
        else if(value === "complete_completed_workouts") {
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
            if(workoutSelected[0].type === "Reps") {
                if(home_or_slash === "slash") {
                    const modal = await repsModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal);
                    return

                }
                const modal = await repsModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return
            } else if(workoutSelected[0].type === "Rounds + Reps") {
                if(home_or_slash === "slash") {
                    console.log("whatever");
                    const modal = await roundsPlusRepsModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal);
                    return

                }
                webAPI.views.push(modal);
                const modal = await roundsPlusRepsModal(payload, workoutSelected[0], "home",publicChannels)
                return
            } else if(workoutSelected[0].type === "Time") {
                if(home_or_slash === "slash") {
                    const modal = await timeModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal)
                    return
                }
                const modal = await timeModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return

            } else if(workoutSelected[0].type === "Load") {

                if(home_or_slash === "slash") {
                    const modal = await loadModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal)
                    return
                }
                const modal = await loadModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return
            } else if(workoutSelected[0].type === "Other / Text") {

                if(home_or_slash === "slash") {
                    const modal = await otherModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal)
                    return
                }
                const modal = await otherModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return

            } else if(workoutSelected[0].type === "Distance") {
                if(home_or_slash === "slash") {
                    const modal = await distanceModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal)
                    return
                }
                const modal = await distanceModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return
            } else if(workoutSelected[0].type === "Meters") {
                if(home_or_slash === "slash") {
                    const modal = await metersModal(payload, workoutSelected[0], "slash",publicChannels)
                    webAPI.views.push(modal)
                    return
                }
                const modal = await metersModal(payload, workoutSelected[0], "home",publicChannels)
                webAPI.views.push(modal);
                return
            }

        }

        //EDIT COMPLETE WORKOUT inside of Workouts Completed createWorkouts/editWorkout.js
        else if(value === "edit_completed_workouts") {
            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("delete", "");
            const metadata = JSON.parse(payload.view.private_metadata);
            const { home_or_slash } = metadata;
            console.log("home_or_slash: ", home_or_slash);
            const workoutSelected = await FinishedWorkout.find({ _id: buttonPressed });
            if(home_or_slash === "slash") {
                const edit = await editCompletedWorkout(payload, workoutSelected[0], "slash")
                webAPI.views.push(edit);
                return
            }

            const edit = await editCompletedWorkout(payload, workoutSelected[0], "home")
            webAPI.views.push(edit);
            return
        }
        //DELETE WORKOUUT inside of Workouts Completed 
        else if(value === "delete_completed_workouts") {
            buttonPressed = buttonPressed.replace("delete", "");
            const metadata = JSON.parse(payload.view.private_metadata);
            const { home_or_slash } = metadata;
            const deleteWorkout = await FinishedWorkout.deleteOne({ _id: buttonPressed });
            const workouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)
            if(home_or_slash === "slash") {
                const workoutIndex = await updatedCompletedWorkouts(payload, payload.view.id, workouts, "slash");
                webAPI.views.update(workoutIndex);
                return
            }
            const workoutIndex = await updatedCompletedWorkouts(payload, payload.view.id, workouts, "home");
            webAPI.views.update(workoutIndex);
            return
        }

        //Pgination for complete workouts
        else if(value === "completed_next" || value === "completed_prev") {

            const metadata = JSON.parse(payload.view.private_metadata);
            const { home_or_slash } = metadata;
            const workouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`);


            if(home_or_slash === "slash") {

                const updatedIndex = await (updatedCompletedWorkouts(payload, payload.view.id, workouts, "slash"))
                webAPI.views.update(updatedIndex);
                return
            }
            const updatedIndex = await (updatedCompletedWorkouts(payload, payload.view.id, workouts, "home"))
            webAPI.views.update(updatedIndex);
            return
        }

        //ENTER SCORE inside of 6-weeks to whatever
        else if(value === "selected_program_score") {
            console.log("blahh");
            console.log("payload in selected_program_score: ", payload);
            viewId = payload.container.view_id;

            const { home_or_slash } = JSON.parse(payload.view.private_metadata);
            buttonPressed = buttonPressed.replace("selected_program_score", "");
            const workoutSelected = await Program.find({ _id: buttonPressed });
            if(home_or_slash === "slash") {
                const submitTimeView = await submitTime(payload, workoutSelected[0], "slash", "no", publicChannels);
                webAPI.views.push(submitTimeView);
                return
            } else {

                const submitTimeView = await submitTime(payload, workoutSelected[0], "home", "no", publicChannels);
                webAPI.views.push(submitTimeView);
                return
            }

        }


        //INSIDE CALENDAR
        //REDO WORKOUT inside viewCalendar
        else if(value === "calendar_workouts") {
            console.log("what");
            console.log("payload: ", payload);
            const metadata = JSON.parse(payload.view.private_metadata);
            console.log("metadata: ", metadata);
            const { home_or_slash, homeModal_view_id } = metadata;
            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("calendar", "");
            const workoutSelected = await FinishedWorkout.find({ _id: buttonPressed });
            //
            //
            if(workoutSelected[0].type === "Reps") {
                if(home_or_slash === "slash") {
                    const modal = await calendarReps(payload, workoutSelected[0], "slash")
                    webAPI.views.push(modal);
                    return

                }
                const modal = await calendarReps(payload, workoutSelected[0], "home")
                webAPI.views.push(modal);
                return
            } else if(workoutSelected[0].type === "Rounds + Reps") {
                if(home_or_slash === "slash") {
                    console.log("whatever");
                    const modal = await calendarRoundsPlusReps(payload, workoutSelected[0], "slash")
                    webAPI.views.push(modal);
                    return

                }
                webAPI.views.push(modal);
                const modal = await calendarRoundsPlusReps(payload, workoutSelected[0], "home")
                return
            } else if(workoutSelected[0].type === "Time") {
                if(home_or_slash === "slash") {
                    const modal = await calendarTime(payload, workoutSelected[0], "slash")
                    webAPI.views.push(modal)
                    return
                }
                const modal = await calendarTime(payload, workoutSelected[0], "home")
                webAPI.views.push(modal);
                return

            } else if(workoutSelected[0].type === "Load") {

                if(home_or_slash === "slash") {
                    const modal = await calendarLoad(payload, workoutSelected[0], "slash")
                    webAPI.views.push(modal)
                    return
                }
                const modal = await calendarLoad(payload, workoutSelected[0], "home")
                webAPI.views.push(modal);
                return
            } else if(workoutSelected[0].type === "Other / Text") {

                if(home_or_slash === "slash") {
                    const modal = await calendarOther(payload, workoutSelected[0], "slash")
                    webAPI.views.push(modal)
                    return
                }
                const modal = await calendarOther(payload, workoutSelected[0], "home")
                webAPI.views.push(modal);
                return

            } else if(workoutSelected[0].type === "Distance") {
                if(home_or_slash === "slash") {
                    const modal = await calendarDistance(payload, workoutSelected[0], "slash")
                    webAPI.views.push(modal)
                    return
                }
                const modal = await calendarDistance(payload, workoutSelected[0], "home")
                webAPI.views.push(modal);
                return
            } else if(workoutSelected[0].type === "Meters") {
                if(home_or_slash === "slash") {
                    const modal = await calendarMeters(payload, workoutSelected[0], "slash")
                    webAPI.views.push(modal)
                    return
                }
                const modal = await calendarMeters(payload, workoutSelected[0], "home")
                webAPI.views.push(modal);
                return
            }

        }

        //EDIT COMPLETE WORKOUT inside of CALENDAR Workouts calendar/editCalendarWorkout.js
        else if(value === "edit_calendar_workouts") {
            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("delete", "");
            const metadata = JSON.parse(payload.view.private_metadata);
            const { home_or_slash } = metadata;
            console.log("home_or_slash: ", home_or_slash);
            const workoutSelected = await FinishedWorkout.find({ _id: buttonPressed });
            if(home_or_slash === "slash") {
                const edit = await editCalendarWorkout(payload, workoutSelected[0], "slash")
                webAPI.views.push(edit);
                return
            }

            const edit = await editCalendarWorkout(payload, workoutSelected[0], "home")
            webAPI.views.push(edit);
            return
        }
        //DELETE WORKOUT inside of Workouts Completed 
        else if(value === "delete_calendar_workouts") {
            buttonPressed = buttonPressed.replace("delete", "");
            const metadata = JSON.parse(payload.view.private_metadata);
            const { home_or_slash } = metadata;
            const deleteWorkout = await FinishedWorkout.deleteOne({ _id: buttonPressed });
            const workouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)
            if(home_or_slash === "slash") {
                const workoutIndex = await updatedCalendarWorkouts(payload, payload.view.id, workouts, "slash");
                webAPI.views.update(workoutIndex);
                return
            }
            const workoutIndex = await updatedCalendarWorkouts(payload, payload.view.id, workouts, "home");
            webAPI.views.update(workoutIndex);
            return
        }








        //AUTHORIZE STRAVA (at the very top of the page)
        else if(value === 'Authorize Strava') {
            const user = payload.user.id;
            const userInfo = await webAPI.users.info({ user: user });
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

        }
        //DEAUTHORIZE STRAVA (at the very top of the page)
        else if(value === 'Deauthorize Strava') {
            const user = payload.user.id;
            const userInfo = await webAPI.users.info({ user: user });

            const passUser = userInfo.user;
            axios.put(`${urlString}/strava/deauth/${passUser.id}`);
            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
            if(payload.view.callback_id === "homepage_modal") {

                // const wod = await CrossFit.find().limit(1).sort({ $natural: -1 });
                const update = updateHomeModal(payload.view.root_view_id, passUser, allWorkouts, wod[0]);
                webAPI.views.update(update)
                return
            }
            webAPI.views.publish(homepage(passUser, allWorkouts))
            return
        }
    } catch (err) {
        console.error(err.message);
    }
});


module.exports = {
    middleware: buttons.expressMiddleware()
}





//