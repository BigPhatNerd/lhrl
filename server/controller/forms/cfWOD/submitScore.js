const submitScore = (trigger_id, wod) => {
    const { title, description, score_type } = wod.data.data[0].attributes;
    if(score_type === "Rounds + Reps") {
        const roundsPlusReps = {
            "trigger_id": trigger_id,
            // 'external_id': _id,
            view: {
                "type": "modal",
                "callback_id": "cf_daily",
                // "private_metadata": _id,

                "title": {
                    "type": "plain_text",
                    "text": "CF WOD",
                    "emoji": true
                },
                "submit": {
                    "type": "plain_text",
                    "text": "Submit",
                    "emoji": true,

                },
                "close": {
                    "type": "plain_text",
                    "text": "Close",
                    "emoji": true
                },
                "blocks": [{
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: `*Title:* ${title}`

                        },


                    }, {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: `*Description:* ${description}`

                        },


                    }, {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: `*Score Type:* ${score_type}`

                        },


                    },

                    {
                        "type": "input",
                        "optional": false,
                        "block_id": "rounds",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "rounds"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Enter Rounds",
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
                        type: "divider"
                    }
                ]
            }

        }
        return roundsPlusReps

    }

}

module.exports = submitScore;