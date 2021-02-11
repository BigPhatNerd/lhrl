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

const homepage = (user, allWorkouts, wod) => {


    //user and userProgram is set in controller/slack-controller publishHomepage



    const view = {

        "user_id": user.id,
        "external_id": "whatever",
        "private_metadata": "something",

        view: {
            "type": "home",
            "callback_id": "homepage_menu",
            "blocks": [{
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Lift Heavy Run Long®",
                        "emoji": true
                    }
                },
                {
                    "type": "image",
                    "image_url": "https://www.liftheavyrunlong.com/wp-content/uploads/2020/05/icon-e1590360608988.png",
                    "alt_text": "logo"
                },

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
module.exports = homepage