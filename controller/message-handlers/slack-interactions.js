const slackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const createWorkout = require('../forms/createWorkout.js');
const createWorkoutModal = require('../forms/createWorkout/createWorkoutModal');
const loadModal = require('../forms/createWorkout/loadModal');
const otherModal = require('../forms/createWorkout/otherModal');
const roundsPlusRepsModal = require('../forms/createWorkout/roundPlusRepsModal');
const timeModal = require('../forms/createWorkout/timeModal');
const distanceModal = require("../forms/createWorkout/timeModal");
const viewWorkouts = require('../forms/viewWorkouts.js');
const editWorkout = require('../forms/editWorkout.js');
const editCompletedWorkout = require('../forms/completedWorkouts/editCompletedWorkouts');
const submitTime = require('../forms/selectedProgram/submitTime.js');
const viewFinishedWorkouts = require('../forms/completedWorkouts/viewCompletedWorkouts');
const homepage = require('../homepage/homeview.js');
const { User, Workout, Program, WeeklyGoal, FinishedWorkout, Session, CrossFit } = require('../../models/');
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
const homeModal = require('../homepage/homeModal');
const updateHomeModal = require('../homepage/updateHomeModal');
const axios = require('axios');
const config = { 'Content-Type': 'application/json' };
const sugarWodConfig = { 'Authorization': sugarwod.sugarwodKey };
const urlString = process.env.NODE_ENV === "production" ? "https://immense-shelf-69979.herokuapp.com" : url.development;
const lhrlWebhook = process.env.NODE_ENV === "production" ? slack.lhrl_Webhook : slack.dev_lhrl_Webhook;

var viewId;
var value;


slackInteractions.action({ type: "static_select" }, async (payload, respond) => {
    try {
        var user_id = payload.user.id;
        value = payload.actions[0].selected_option.value;   
        if(value === "5K") {
            const workouts = await axios.get(`${urlString}/programs/selectedProgram/view-program/${value}`);

if(payload.view.callback_id === "homepage_modal") {
    const fiveKIndex = await view5KProgram(payload, workouts, "slash");
    web.views.push(fiveKIndex);
    return
}
const fiveKIndex = await view5KProgram(payload, workouts, "home");
            web.views.open(fiveKIndex);
        } else if(value === "10K") {
            const workouts = await axios.get(`${urlString}/programs/selectedProgram/view-program/${value}`);
            
            if(payload.view.callback_id === "homepage_modal") {
                const tenKIndex = await view10KProgram(payload, workouts, "slash");
    web.views.push(tenKIndex);
    return
}
const tenKIndex = await view10KProgram(payload, workouts, "home");
            web.views.open(tenKIndex);
        } else if(value === "rounds_plus_reps" || value === "time" || value === "load" || value === "distance") {

if(payload.view.callback_id === "homepage_modal") {
    const create = await createWorkoutModal(payload, value, "slash")
    web.views.push(create);
    return
}

const create = await createWorkoutModal(payload, value, "home")
            web.views.open(create);
        } else if(value === "view_workout") {
            const workouts = await axios.get(`${urlString}/slack/get-workouts/${user_id}`)

            if(payload.view.callback_id === "homepage_modal") {
                const workoutIndex = await viewWorkouts(payload, workouts, "slash");
    web.views.push(workoutIndex);
    return
}

            const workoutIndex = await viewWorkouts(payload, workouts, "home");
            web.views.open(workoutIndex);
        } else if(value === "completed_workouts") {
            const finishedWorkouts = await axios.get(`${urlString}/finishedWorkouts/${user_id}`)
            
            if(payload.view.callback_id === "homepage_modal") {
                const finishedWorkoutIndex = await viewFinishedWorkouts(payload, finishedWorkouts, "slash");
    web.views.push(finishedWorkoutIndex);
    return
}
const finishedWorkoutIndex = await viewFinishedWorkouts(payload, finishedWorkouts, "home");
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
        var username = payload.user.username;
        var user_id = payload.user.id;
        if(value === "complete_created_workouts") {
            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("complete", "");
             const workoutSelected = await Workout.find({ _id: buttonPressed });
const metadata = JSON.parse(payload.view.private_metadata);
    const { home_or_slash, homeModal_view_id } = metadata;

            if(workoutSelected[0].type === "Rounds + Reps") {
                if(home_or_slash === "slash"){
                    web.views.push(roundsPlusRepsModal(payload, workoutSelected[0], "slash", homeModal_view_id));
                }
                web.views.push(roundsPlusRepsModal(payload, workoutSelected[0], "home", "noModal"));
            } else if(workoutSelected[0].type === "Time") {
                if(home_or_slash === "slash"){
                    web.views.push(timeModal(payload, workoutSelected[0], "slash", homeModal_view_id))
                }
                web.views.push(timeModal(payload, workoutSelected[0], "home", "noModal"));
            } else if(workoutSelected[0].type === "Load") {
                if(home_or_slash === "slash"){
                    web.views.push(loadModal(payload, workoutSelected[0], "slash", homeModal_view_id))
                }
                web.views.push(loadModal(payload, workoutSelected[0], "home", "noModal"));
            }  else if(workoutSelected[0].type === "Other") {
                if(home_or_slash === "slash"){
                    web.views.push(otherModal(payload, workoutSelected[0], "slash", homeModal_view_id))
                }
                web.views.push(otherModal(payload, workoutSelected[0], "home", "noModal"));
            } else if(workoutSelected[0].type === "Distance") {
                if(home_or_slash === "slash"){
                    web.views.push(distanceModal(payload, workoutSelected[0], "slash", homeModal_view_id))
                }
                web.views.push(distanceModal(payload, workoutSelected[0], "home", "noModal"));
            }


        } else if(value === "edit_created_workouts") {
            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("delete", "");
            const workoutSelected = await Workout.find({ _id: buttonPressed });
const awaitWorkouts = await editWorkout(payload, workoutSelected[0])
            web.views.push(awaitWorkouts);
        } else if(value === "delete_created_workouts") {
            buttonPressed = buttonPressed.replace("delete", "");
            const deleteWorkout = await axios.delete(`${urlString}/slack/delete-workout/${buttonPressed}`);

            const metadata = JSON.parse(payload.view.private_metadata);
    const {  homeModal_view_id } = metadata;

            const updatedIndex = await(updatedWorkouts(payload.view.id, user_id, homeModal_view_id))
            web.views.update(updatedIndex);
        } else if(value === "complete_completed_workouts") {
            viewId = payload.container.view_id;
            buttonPressed = buttonPressed.replace("complete", "");
            const workoutSelected = await FinishedWorkout.find({ _id: buttonPressed });
            if(workoutSelected[0].type === "Rounds + Reps") {
                web.views.push(roundsPlusRepsModal(payload, workoutSelected[0]));
            } else if(workoutSelected[0].type === "Time") {
                web.views.push(timeModal(payload, workoutSelected[0]));
            } else if(workoutSelected[0].type === "Load") {
                web.views.push(loadModal(payload, workoutSelected[0]));
            } else if(workoutSelected[0].type === "Distance") {
                web.views.push(distanceModal(payload, workoutSelected[0]));
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
            const workoutIndex = await updatedCompletedWorkouts(payload.view.id, user_id);
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
            const wod = await CrossFit.find().limit(1).sort({$natural:-1});
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
            if(home_or_slash === "slash"){
             
                 const submitTimeView = await submitTime(payload, workoutSelected[0], homeModal_view_id, "slash");
                 web.views.push(submitTimeView);
            } else {

                const submitTimeView = await submitTime(payload, workoutSelected[0], "homepage", "home");
                web.views.push(submitTimeView);
            }

        } else if(value === 'daily_program_score') {

buttonPressed = buttonPressed.replace("daily_program_score", "");
            const workoutSelected = await Program.find({ _id: buttonPressed });
if(payload.view.private_metadata !== "" ){
 const metadata = JSON.parse(payload.view.private_metadata );
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

const wod = await CrossFit.find().limit(1).sort({$natural:-1});

if(payload.view.callback_id === "homepage_modal"){

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
            if(payload.view.callback_id === "homepage_modal"){
    
    const wod = await CrossFit.find().limit(1).sort({$natural:-1});
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
  const wod = await CrossFit.find().limit(1).sort({$natural:-1});
if(home_or_slash === "slash"){
   
    const update = updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0]);
            web.views.update(update)
} else {
    const updateHome = homepage(passUser, allWorkouts, wod[0])
     web.views.publish(updateHome);
}
        const confirm = await axios.post(lhrlWebhook, { "text": `🏃‍♀️ ${username} just signed up for the 5k program 🏃‍♂️` }, config)
        
    } catch (err) {
        console.error(err.message);
    }
});

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
         const wod = await CrossFit.find().limit(1).sort({$natural:-1}); 
        if(home_or_slash === "slash"){ 
       const update = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])

            web.views.update(update);        
} else {
    const updateHome = await homepage(passUser, allWorkouts, wod[0]);
    web.views.publish(updateHome);
}
        const confirm = await axios.post(lhrlWebhook, { "text": `🏃‍♀️ ${username} just signed up for the 10k program 🏃‍♂️` }, config)
    } catch (err) {
        console.error(err.message);
    }
});

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
        const updated = await updatedWorkouts(viewId, passUser.id, homeModal_view_id);
        web.views.update(updated)
    } catch (err) {
        console.error(err.message);
    }
});


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
        const updated = await updatedCompletedWorkouts(viewId, passUser.id);
        web.views.update(updated)
    } catch (err) {
        console.error(err.message);
    }
});
slackInteractions.viewSubmission('view_workouts', async (payload, respond) => {
//   Nothing is happening here. Is that cool?
console.log("do what")

});

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

        const confirm = await axios.post(lhrlWebhook, { "text": `🏋️‍♀️ ${username} just created a new workout 🏋` }, config)

        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;

        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
     
if(home_or_slash === "slash"){
        
        const wod = await CrossFit.find().limit(1).sort({$natural:-1});
        const updateWorkouts = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])
web.views.update(updatedWorkouts); 
return       
    }
        const wod = await CrossFit.find().limit(1).sort({$natural:-1});
        const updateHome = await homepage(passUser, allWorkouts, wod[0])
        await web.views.publish(updateHome);

    } catch (err) {
        console.error(err.message);
    }

});

slackInteractions.viewSubmission('complete_workout', async (payload, respond) => {
    try {

        const metadata = JSON.parse(payload.view.private_metadata);
        const { score_type, name, description, home_or_slash, homeModal_view_id } = metadata;
        const username = payload.user.username;
        const user_id = payload.user.id;
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
        const confirm = await axios.post(lhrlWebhook, { "text": `🏋️‍♀️ ${username} just finished a new workout 🏋` }, config)
        const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;

        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
        console.log("home_or_slash line 610: ", home_or_slash);
       if(home_or_slash === "slash"){
        const wod = await CrossFit.find().limit(1).sort({$natural:-1});
        const updateWorkouts = await updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])
web.views.update(updatedWorkouts); 
return       
    }
        // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
        await web.views.publish(homepage(passUser, allWorkouts))

      

    } catch (err) {
        console.error(err.message);
    }
});


slackInteractions.viewSubmission('selected_program_workouts', async (payload, respond) => {
    try {
     
        const metadata = JSON.parse(payload.view.private_metadata);
var { minutes, seconds, miles, notes } = payload.view.state.values;
        const { id, home_or_slash, homeModal_view_id, enter_score_slash, score_type } = metadata;
        //id is workoutId
        var data;
if (score_type === "Time"){
    minutes = minutes.minutes.value || 0;
            seconds = seconds.seconds.value || 0;
            notes = notes.notes.value || "No notes provided.";
          
         data = {
            minutes: parseInt(minutes),
            seconds: parseInt(seconds),
            notes: notes

           
        }
    } else if(score_type === "Distance"){
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

if(enter_score_slash === "yes"){
    
const user = payload.user.id;
        const userInfo = await web.users.info({ user: user });
        const passUser = userInfo.user;
        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`); 
        
        const wod = await CrossFit.find().limit(1).sort({$natural:-1});    
web.views.update(updateHomeModal(homeModal_view_id, passUser, allWorkouts, wod[0])) 
return  
}
if(home_or_slash === "slash"){
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