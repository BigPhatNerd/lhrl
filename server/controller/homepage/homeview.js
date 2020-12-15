const {
    currentlySubscribed,
    removeFromProgram,
    todaysWorkout,
    weeklyGoals

} = require('./helpers');
var dayjs = require("dayjs");
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
// dayjs().format('YYYY-MM-D')
const homepage = (user, userProgram) => {
    console.log(dayjs().week())

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
                currentlySubscribed(userProgram),
                {
                    "type": "divider"
                },
                todaysWorkout(userProgram),
                {
                    "type": "divider"
                },
                removeFromProgram(userProgram),
                {
                    "type": "divider"
                },
                weeklyGoals(),
                {
                    "type": "divider"
                },








            ]
        }
    }
    return view
}
module.exports = homepage