const roundsPlusRepsModal = (trigger_id, workout) => {
    const { type, name, description, rounds, reps, notes } = workout;
    const roundsPlusReps = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "complete_workout",
            "private_metadata": JSON.stringify({
                "score_type": "Rounds + Reps",
                "type": type,
                "name": name,
                "description": description
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
                    "block_id": "rounds",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "rounds"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Rounds",
                        "emoji": true
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
    return roundsPlusReps
}

module.exports = roundsPlusRepsModal;