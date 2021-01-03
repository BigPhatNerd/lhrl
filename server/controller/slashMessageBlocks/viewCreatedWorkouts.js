const slashViewCreatedWorkouts = {
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
}

module.exports = slashViewCreatedWorkouts;