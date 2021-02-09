const calendarOther = (payload, workout, slashOrHome) => {
    const { trigger_id } = payload;
    const { type, name, description, weight, notes } = workout;
    const metadata = JSON.parse(payload.view.private_metadata);
    const { paginate } = metadata;
    const other = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "calendar_workout",
            "private_metadata": JSON.stringify({
                "score_type": "Other",
                "type": type,
                "name": name,
                "description": description,
                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.root_view_id,
                "action": payload.actions[0].value,

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
                    "type": "input",
                    "block_id": "radio",
                    "element": {
                        "type": "radio_buttons",
                        "initial_option": {
                            "text": {
                                "type": "mrkdwn",
                                "text": "*Keep this private.* :shushing_face:"
                            },
                            "value": "private"
                        },
                        "options": [{
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
                        "action_id": "radio_buttons-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Privacy Settings:",
                        "emoji": true
                    }
                }, {
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

module.exports = calendarOther;