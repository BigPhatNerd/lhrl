const repsModal = (payload, workout, slashOrHome, publicChannels) => {
    const channelOptions = publicChannels.map(channel =>{
        return {
                                "text": {
                                    "type": "plain_text",
                                    "text": channel,
                                    "emoji": true
                                },
                                "value": channel,
                            }
    })

const staticSelect = {
                    "type": "section",
                    "block_id": "type",
                    "text": {
                        "type": "plain_text",
                        "text": "Keep private 🤫 or post to channel 🔊",
                        "emoji": true
                    },
                    "accessory": {
                        "type": "static_select",

                        "placeholder": {
                            "type": "plain_text",
                            "text": "Keep private 🤫" ,

                            "emoji": true
                        },
                        "options": channelOptions,
                        "action_id": "public_private"
                    }
                }

    const { trigger_id } = payload;
    const { type, name, description, reps, notes } = workout;
    console.log("payload: ", payload);
    const metadata = JSON.parse(payload.view.private_metadata); 
    const { paginate } = metadata;
    const repsView = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "complete_workout",
            "private_metadata": JSON.stringify({
                "score_type": "Reps",
                "type": type,
                "name": name,
                "description": description,
                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.root_view_id,
                "action": payload.actions[0].value,
                "view_paginate": String(0),
                "paginate": String(paginate)

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
            "blocks": [
            staticSelect,{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Type:* " + type,

                    }
                }, {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Name:* " + name,

                    }
                }, {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Description:* " + description,

                    }
                },



                {
                    "type": "input",
                    "optional": true,
                    "block_id": "reps",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "reps"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Reps",
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
    return repsView
}

module.exports = repsModal;