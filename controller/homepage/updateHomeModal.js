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
    divider



} = require('./helpers');
const { cfWOD } = require('./helpers/sugarWod');
const saveAndCreateCFWods = require('./helpers/saveAndCreateCFWods');

const updateHomeModal = (homeModal_view_id, user, allWorkouts, wod) => {
    // const metadata = JSON.parse(payload.view.private_metadata)

    // console.log("payload in update home(find viewId): ",payload)
    //user and userProgram is set in controller/slack-controller publishHomepage


    const view = {

        "user_id": user.id,
        "view_id": homeModal_view_id,
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
               header("Welcome " + user.real_name),
                authorizePrograms(allWorkouts),
                divider(),
                header("Activity Calendar"),
                calendar(allWorkouts),
                divider(),
                header("Here is your goal summary for this week"),
                weeklyGoals(allWorkouts),
                enterGoalReps(allWorkouts),
                divider(),
                header("Workout of the Day"),
                cfWOD(wod),
                divider(),
                header("Latest Strava Workout"),
                stravaWorkout(allWorkouts),
                divider(),
                header("Subscribe to Program"),
                choosePlan(),
                divider(),
                currentlySubscribed(allWorkouts),
                divider(),
                todaysWorkout(allWorkouts),
                divider(),
                removeFromProgram(allWorkouts),
                divider(),
                header("Workouts Section"),
                divider(),
                createWorkout(),
                viewOrComplete(),
                divider(),
            ]
        }
    }
    return view
}
module.exports = updateHomeModal;



//