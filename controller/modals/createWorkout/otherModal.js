const otherModal = (payload, workout,slashOrHome, homeModal_view_id) => {
    const { trigger_id } = payload;
    const { type, name, description, weight, notes } = workout;
    const other = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "complete_workout",
            "private_metadata": JSON.stringify({
                "score_type": "Other",
                "type": type,
                "name": name,
                "description": description,
                "home_or_slash": slashOrHome,
                  "homeModal_view_id": homeModal_view_id,
                   "action": payload.actions[0].value
            }),
            "title": {
                "type": "plain_text",
                "text": "Complete Workout",
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
    return other
}

module.exports = otherModal;