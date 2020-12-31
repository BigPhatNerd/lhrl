const loadModal = (trigger_id) => {
    const load = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "create_workout",
            "private_metadata": JSON.stringify({
                "score_type": "Load",
            }),
            "title": {
                "type": "plain_text",
                "text": "Create Load Workout",
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
                    "optional": true,
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
                {
                    "type": "input",
                    "optional": true,
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
    return load
}

module.exports = loadModal;