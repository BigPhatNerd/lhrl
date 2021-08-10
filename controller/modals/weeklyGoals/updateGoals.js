const updateGoals = (payload, goalSelected, slashOrHome) => {
const { trigger_id } = payload;
    const { _id, userId, pushups, situps, squats, miles, date } = goalSelected;
    //Check to see if the movement exists

    const checkForMovement = (movement) => {
        if(typeof movement !== "undefined" && movement !== null) {
            return movement.toString();
        }
        return ''
    }
    const goalModal = {

        "trigger_id": trigger_id,
        "external_id": _id,
        "view": {
            "type": "modal",
            "callback_id": "update_goals",
           "private_metadata": JSON.stringify({
                "home_or_slash": slashOrHome,
                  "homeModal_view_id": payload.view.id,
                  "id": _id

              }),
            "title": {
                "type": "plain_text",
                "text": "Update Goals",
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
                            "type": "plain_text",
                            "text": "Share with channel 🔊",
                            "emoji":true
                        },
                        "value": "public"
                    },
                "options": [
                    {
                        "text": {
                             "type": "plain_text",
                            "text": "Keep this private. 🤫",
                            "emoji": true
                        },
                        "value": "private"
                    },
                    {
                       "text": {
                            "type": "plain_text",
                            "text": "Share with channel 🔊",
                            "emoji":true
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
        },{
                    "type": "input",
                    "optional": true,
                    "block_id": "pushups",
                    "element": {

                        "type": "plain_text_input",
                        "initial_value": checkForMovement(pushups),
                        "action_id": "pushups"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Pushups",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "optional": true,
                    "block_id": "situps",
                    "element": {

                        "type": "plain_text_input",
                        "initial_value": checkForMovement(situps),
                        "action_id": "situps"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Situps",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "optional": true,
                    "block_id": "squats",
                    "element": {

                        "type": "plain_text_input",
                        "initial_value": checkForMovement(squats),
                        "action_id": "squats"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Squats",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "optional": true,
                    "block_id": "miles",
                    "element": {

                        "type": "plain_text_input",
                        "initial_value": checkForMovement(miles),
                        "action_id": "miles"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Miles",
                        "emoji": true
                    }
                }

            ]
        }
    }
    return goalModal
}

module.exports = updateGoals