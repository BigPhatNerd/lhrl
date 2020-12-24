const {
    currentlySubscribed,
    removeFromProgram,
    todaysWorkout,
    weeklyGoals,
    enterGoalReps,


} = require('./helpers');
const {
    cfWOD
} = require('./helpers/sugarWod');

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
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Create or View Custom Workouts",
                        "emoji": true
                    }
                },
                {
                    "type": "actions",
                    "elements": [{
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Create Workout",
                                "emoji": true
                            },
                            "value": "create_workout",
                            "action_id": "create_workout"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "View Workouts",
                                "emoji": true
                            },
                            "value": "view_workout",
                            "action_id": "view_workout"
                        }
                    ]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Subscribe to Program",
                        "emoji": true
                    }
                },
                {
                    "type": "actions",
                    "elements": [{
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "6-Weeks to 5K",
                                "emoji": true
                            },
                            "value": "5K",
                            "action_id": "5K"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "6-Weeks to 10K",
                                "emoji": true
                            },
                            "value": "10K",
                            "action_id": "10K"
                        },

                    ],

                },
                {
                    "type": "divider"
                },
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": user.real_name,
                        "emoji": true
                    }
                },
                currentlySubscribed(allWorkouts),
                {
                    "type": "divider"
                },
                todaysWorkout(allWorkouts),
                {
                    "type": "divider"
                },
                removeFromProgram(allWorkouts),
                {
                    "type": "divider"
                },
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Here is your goal summary for this week",
                        "emoji": true
                    }
                },
                weeklyGoals(allWorkouts),

                {
                    "type": "divider"
                },

                enterGoalReps(allWorkouts),
                {
                    "type": "divider"
                },
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "CrossFit HQ Workout of the Day",
                        "emoji": true
                    }
                },
                cfWOD(wod),








            ]
        }
    }
    return view
}
module.exports = homepage