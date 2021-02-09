const calendarTime = (payload, workout, slashOrHome) => {
    const { trigger_id } = payload;
    const { type, name, description, minutes, seconds, notes } = workout;
    const metadata = JSON.parse(payload.view.private_metadata);
    const { paginate } = metadata;

    const time = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "calendar_workout",
            "private_metadata": JSON.stringify({
                "score_type": "Time",
                "type": type,
                "name": name,
                "description": description,
                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.root_view_id,
                "action": payload.actions[0].value,

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

module.exports = calendarTime;