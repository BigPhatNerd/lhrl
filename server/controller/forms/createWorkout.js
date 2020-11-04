const createWorkout = (trigger_id) => {
    const workoutModal = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "LHRL®",
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
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Create a workout",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Choose type",
                            "emoji": true
                        },
                        "options": [{
                                "text": {
                                    "type": "plain_text",
                                    "text": "Crossfit",
                                    "emoji": true
                                },
                                "value": "value-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Running",
                                    "emoji": true
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Weights",
                                    "emoji": true
                                },
                                "value": "value-2"
                            }
                        ],
                        "action_id": "static_select-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Select Workout Type",
                        "emoji": true
                    }
                },
                {
                    "dispatch_action": true,
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "plain_text_input-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Enter Rounds",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "multiline": true,
                        "action_id": "plain_text_input-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Describe Workout",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "datepicker",
                        "initial_date": "2020-04-28",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select a date",
                            "emoji": true
                        },
                        "action_id": "datepicker-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Date of Workout",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": "This is a plain text section block.",
                        "emoji": true
                    }
                }
            ]
        }
    }
    return workoutModal
}

module.exports = createWorkout;