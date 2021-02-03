const loadModal = (payload, workout, slashOrHome) => {
    const { trigger_id } = payload;
    const { type, name, description, weight, notes } = workout;
    const load = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "complete_workout",
            "private_metadata": JSON.stringify({
                "score_type": "Load",
                "type": type,
                "name": name,
                "description": description,
                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.root_view_id,
                "action": payload.actions[0].value,
                "view_paginate": String(0)

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
            "blocks": [
            {
            "type": "section",
            "block_id": "public_private",
            "text": {
                "type": "mrkdwn",
                "text": "Privacy Settings:"
            },
            "accessory": {
                "type": "checkboxes",
                "initial_options": [ {
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Keep this private.* :shushing_face:"
                        },
                        "value": "private"
                    }],
                "options": [
                    {
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Keep this private.* :shushing_face:"
                        },
                        "value": "private"
                    },
                    {
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Share with channel* :loud_sound:"
                        },
                        "value": "public"
                    }
                ],
                "action_id": "checkboxes-action"
            }
        },{
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