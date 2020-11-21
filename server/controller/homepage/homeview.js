const homepage = (user) => {
    const view = {
        "user_id": user,
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
                    "type": "context",
                    "elements": [{
                        "type": "plain_text",
                        "text": "Select action that you wish to take:",
                        "emoji": true
                    }]
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
                }
            ]
        }
    }
    return view
}
module.exports = homepage