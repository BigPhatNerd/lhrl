const timeModal = (payload, workout) => {
    const { trigger_id } = payload;
    const { type, name, description, minutes, seconds, notes } = workout;
    const time = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "complete_workout",
            "private_metadata": JSON.stringify({
                "score_type": "Time",
                "type": type,
                "name": name,
                "description": description
            }),
            "title": {
                "type": "plain_text",
                "text": "Complete Timed Workout",
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
                        "text": "*Type:* " + type
                    }
                }, {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Name:* " + name
                    }
                }, {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Description:* " + description
                    }
                },
                {
                    "type": "input",
                    "optional": true,
                    "block_id": "minutes",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "minutes"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Minutes",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "optional": true,
                    "block_id": "seconds",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "seconds"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Seconds",
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
    return time
}

module.exports = timeModal;