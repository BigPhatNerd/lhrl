const slashSubscribeToProgram = {
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
}

module.exports = slashSubscribeToProgram;