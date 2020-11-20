const editWorkout = (trigger_id, workoutSelected) => {
    const { _id, type, name, duration, weight, reps, sets, distance } = workoutSelected;
    console.log("type in the editWorkout: ", type);
    const editWorkoutModal = {
        "trigger_id": trigger_id,
        "external_id": _id,
        view: {
            "type": "modal",
            "callback_id": "edit_workout",
            "private_metadata": _id,
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
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [{
                    "type": "input",
                    "optional": true,
                    "block_id": "type",
                    "element": {
                        "type": "static_select",
                        "initial_option": {
                            "text": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": type
                            },
                            "value": type
                        },
                        "options": [{
                                "text": {
                                    "type": "plain_text",
                                    "text": "CrossFit 🏃‍♂️🏋️‍♀️🏊‍♀️",
                                    "emoji": true
                                },
                                "value": "CrossFit 🏃‍♂️🏋️‍♀️🏊‍♀️"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Weightlifting 🏋️‍♀️",
                                    "emoji": true
                                },
                                "value": "Weightlifting 🏋️‍♀️"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Cardio ❤️🤮",
                                    "emoji": true
                                },
                                "value": "Cardio ❤️🤮"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Running 🏃‍♂️",
                                    "emoji": true
                                },
                                "value": "Running 🏃‍♂️"
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
                    "optional": true,
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
                    "block_id": "duration",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": duration.toString(),
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
                    "optional": true,
                    "block_id": "weight",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": weight.toString(),
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
                    "optional": true,
                    "block_id": "reps",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": reps.toString(),
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

                    "block_id": "sets",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": sets.toString(),
                        "action_id": "sets",
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Sets",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "optional": true,
                    "block_id": "distance",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": distance.toString(),
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

    return editWorkoutModal


};



module.exports = editWorkout;





//