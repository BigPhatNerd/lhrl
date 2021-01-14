const createWorkoutModal = (payload, value, homeOrSlash) => {
    const { trigger_id } = payload;
    const type = (value) => {
        if(value === "rounds_plus_reps") {
            return "Rounds + Reps"
        } else if(value === "time") {
            return "Time"
        } else if(value === "load") {
            return "Load"
        } else if(value === "distance") {
            return "Distance"
        }
    };
    const description = (value) => {
        if(value === "rounds_plus_reps") {
            return "Rounds + Reps Workout"
        } else if(value === "time") {
            return "Timed Workout"
        } else if(value === "load") {
            return "Load Workout"
        } else if(value === "distance") {
            return "Distance Workout"
        }
    };
    const modal = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "create_workout",
            "private_metadata": JSON.stringify({
                "score_type": type(value),
               
            }),
            "title": {
                "type": "plain_text",
                "text": description(value),
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
                    "optional": false,
                    "block_id": "description",
                    "element": {
                        "type": "plain_text_input",
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
    return modal
}

module.exports = createWorkoutModal;