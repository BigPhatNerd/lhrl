const editWorkout = (payload, workoutSelected) => {
    const { trigger_id } = payload;
    const { _id, type, name, description } = workoutSelected;
    const metadata = JSON.parse(payload.view.private_metadata)
    
console.log("payload in edit*: ", payload)
    const roundRepsModal = {
        "trigger_id": trigger_id,
        "external_id": _id,
        view: {
            "type": "modal",
            "callback_id": "edit_created_workout",
            "private_metadata": JSON.stringify({
                "id": _id,
                "score_type": "Rounds + Reps",
                 "homeModal_view_id": metadata.homeModal_view_id

            }),
            "title": {
                "type": "plain_text",
                "text": "Edit Workout",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Close",
                "emoji": true
            },
            "blocks": [{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Edit Type:"
                    },
                    "accessory": {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": type,
                            "emoji": true
                        },
                        "options": [{
                                "text": {
                                    "type": "plain_text",
                                    "text": "Rounds + Reps",
                                    "emoji": true
                                },
                                "value": "rounds_plus_reps",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Time",
                                    "emoji": true
                                },
                                "value": "time"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Load",
                                    "emoji": true
                                },
                                "value": "load"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Distance",
                                    "emoji": true
                                },
                                "value": "distance"
                            },


                        ],
                        "action_id": "create"
                    }
                },
                {

                    "type": "input",
                    "block_id": "name",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": name,
                        "action_id": "name"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Name",
                        "emoji": true
                    }
                },

                {
                    "type": "input",
                    "optional": true,
                    "block_id": "description",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": description,
                        "multiline": true,
                        "action_id": "description"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Description",
                        "emoji": true
                    }
                },

            ]
        }
    }
    return roundRepsModal



    ////////////////


};



module.exports = editWorkout;





//