const {
    currentlySubscribed,
    removeFromProgram,
    todaysWorkout,
    weeklyGoals,
    enterGoalReps,
    authorizePrograms,
    viewOrComplete,
    createWorkout,
    header,
    choosePlan,
    stravaWorkout,
    calendar,
    divider,


} = require('./helpers');
const { cfWOD } = require('./helpers/sugarWod');
const saveAndCreateCFWods = require('./helpers/saveAndCreateCFWods');

const homeModal = (trigger_id, user, allWorkouts, wod) => {


    //user and userProgram is set in controller/slack-controller publishHomepage



    const view = {

        "user_id": user.id,
        "external_id": "whatever",

        "trigger_id": trigger_id,
        "response_action": "clear",
        view: {
            "type": "modal",
            "callback_id": "homepage_modal",
            "private_metadata": JSON.stringify({
                "home_or_slash": "slash"
            }),
            "title": {
                "type": "plain_text",
                "text": "LHRL APP",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [

                authorizePrograms(allWorkouts),
                header("Workouts Section"),
                divider(),

                createWorkout(),
                viewOrComplete(),
                header("Subscribe to Program"),
                choosePlan(),
                divider(),
                header(user.real_name),
                currentlySubscribed(allWorkouts),
                divider(),
                todaysWorkout(allWorkouts),
                divider(),
                removeFromProgram(allWorkouts),
                divider(),
                header("Here is your goal summary for this week"),
                weeklyGoals(allWorkouts),
                divider(),
                enterGoalReps(allWorkouts),
                divider(),
                header("Workout of the Day"),
                cfWOD(wod),
                divider(),
                header("Latest Strava Workout"),
                stravaWorkout(allWorkouts),
                divider(),
                header("Activity Calendar"),
                calendar(allWorkouts)









            ]
        }
    }
    return view
}
module.exports = homeModal