const slashCreateWorkout = {
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
}

module.exports = slashCreateWorkout