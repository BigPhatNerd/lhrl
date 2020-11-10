const createWorkout = (trigger_id) => {
    const workoutModal = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "create_workout",
            "title": {
                "type": "plain_text",
                "text": "Create Workout",
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
                    "block_id": "type",
                    "element": {
                        "type": "static_select",

                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select an item",
                            "emoji": true
                        },
                        "options": [{
                                "text": {
                                    "type": "plain_text",
                                    "text": "CrossFit 🏃‍♂️🏋️‍♀️🏊‍♀️",
                                    "emoji": true
                                },
                                "value": "crossFit"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Weightlifting 🏋️‍♀️",
                                    "emoji": true
                                },
                                "value": "weightlifting"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Cardio ❤️🤮",
                                    "emoji": true
                                },
                                "value": "cardio"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Running 🏃‍♂️",
                                    "emoji": true
                                },
                                "value": "running"
                            }
                        ],
                        "action_id": "choose_type"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Workout type",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "block_id": "name",
                    "element": {
                        "type": "plain_text_input",
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
                    "block_id": "duration",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "duration"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Duration",
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
                        "text": "Weight",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
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
                    "block_id": "sets",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "sets"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Sets",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "block_id": "distance",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "distance"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Distance",
                        "emoji": true
                    }
                }
            ]
        }
    }
    return workoutModal
}

module.exports = createWorkout;