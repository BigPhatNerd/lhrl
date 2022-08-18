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
    requiredHelpers,
    chooseChannelToPost,
    



} = require('./helpers');
const { cfWOD } = require('./helpers/sugarWod');
const saveAndCreateCFWods = require('./helpers/saveAndCreateCFWods');

const homepage = (user, allWorkouts, wod, publicChannels) => {

    //user and userProgram is set in controller/slack-controller publishHomepage


    const view = {

        "user_id": user.id,
        "external_id": "whatever",
        

        view: {
            "type": "home",
            "callback_id": "homepage_menu",
             "private_metadata": JSON.stringify({
                "home_or_slash": "home"
            }),
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
                header("Welcome " + user.real_name),
                chooseChannelToPost(publicChannels, allWorkouts),
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
                requiredHelpers()

            ]
        }
    }

    return view
}
module.exports = homepage