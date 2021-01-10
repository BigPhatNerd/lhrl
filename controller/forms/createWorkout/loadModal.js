const loadModal = (trigger_id, workout) => {
    const { type, name, description, weight, notes } = workout
    const load = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "complete_workout",
            "private_metadata": JSON.stringify({
                "score_type": "Load",
                "type": type,
                "name": name,
                "description": description
            }),
            "title": {
                "type": "plain_text",
                "text": "Complete Load Workout",
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
            "blocks": [{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Type:* " + type,
                        "emoji": true
                    }
                }, {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Name:* " + name,
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Description:* " + description,
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "block_id": "weight",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "weight"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Weight in lbs",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "optional": true,
                    "block_id": "notes",
                    "element": {
                        "type": "plain_text_input",
                        "multiline": true,
                        "action_id": "notes"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Notes",
                        "emoji": true
                    }
                },


            ]
        }
    }
    return load
}

module.exports = loadModal;