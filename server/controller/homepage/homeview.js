const {
    currentlySubscribed,
    removeFromProgram,
    todaysWorkout,
    weeklyGoals,
    enterGoalReps,
    authorizePrograms


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
                ////
                //////////////
                authorizePrograms(allWorkouts),
                //////
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Workouts Section",
                        "emoji": true
                    }
                },



                {
                    "type": "divider"
                },

                ////// Insert Create Workouts with different types
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Create a Workout:"
                    },
                    "accessory": {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select workout type",
                            "emoji": true
                        },
                        "options": [{
                                "text": {
                                    "type": "plain_text",
                                    "text": "Rounds + Reps",
                                    "emoji": true
                                },
                                "value": "rounds_plus_reps",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Time",
                                    "emoji": true
                                },
                                "value": "time"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Load",
                                    "emoji": true
                                },
                                "value": "load"
                            },


                        ],
                        "action_id": "create"
                    }
                },
                //^^ Create workouts with types

                /////
                ////////////
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "View or Complete a Workout:"
                    },
                    "accessory": {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select an item",
                            "emoji": true
                        },
                        "options": [{
                                "text": {
                                    "type": "plain_text",
                                    "text": "View Created Workouts",
                                    "emoji": true
                                },
                                "value": "view_workout"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "View Completed Workouts",
                                    "emoji": true
                                },
                                "value": "completed_workouts"
                            },

                        ],
                        "action_id": "create_edit_view"
                    }
                },

                ///////////
                //////


                ///////


                ////////
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Subscribe to Program",
                        "emoji": true
                    }
                },

                //
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Choose a plan:"
                    },
                    "accessory": {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select an item",
                            "emoji": true
                        },
                        "options": [{
                                "text": {
                                    "type": "plain_text",
                                    "text": "6-Weeks to 5K",
                                    "emoji": true
                                },
                                "value": "5K",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6-Weeks to 10K",
                                    "emoji": true
                                },
                                "value": "10K"
                            },

                        ],
                        "action_id": "choose_plan"
                    }
                },

                ///////////
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