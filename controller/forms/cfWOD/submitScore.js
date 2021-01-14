const submitScore = (payload, wod) => {
const {trigger_id } = payload;
    const { title, description, score_type } = wod.data.data[0].attributes;
    if(score_type === "Rounds + Reps") {
        const roundsPlusReps = {
            "trigger_id": trigger_id,
            // 'external_id': _id,
            view: {
                "type": "modal",
                "callback_id": "cf_daily",
                "private_metadata": JSON.stringify({
                    "title": title,
                    "description": description,
                    "score_type": score_type,
                }),

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
                        "type": "input",
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
                    {
                        type: "divider"
                    }
                ]
            }

        }
        return roundsPlusReps

    } else if(score_type === "Time") {
        const time = {
            "trigger_id": trigger_id,
            // 'external_id': _id,
            view: {
                "type": "modal",
                "callback_id": "cf_daily",
                "private_metadata": JSON.stringify({
                    "title": title,
                    "description": description,
                    "score_type": score_type,
                }),


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
                        "block_id": "minutes",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "minutes"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Enter Minutes",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "block_id": "seconds",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "seconds"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Enter Seconds",
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
                    {
                        type: "divider"
                    }
                ]
            }

        }
        return time
    } else if(score_type === "Load") {
        const load = {
            "trigger_id": trigger_id,
            // 'external_id': _id,
            view: {
                "type": "modal",
                "callback_id": "cf_daily",
                "private_metadata": JSON.stringify({
                    "title": title,
                    "description": description,
                    "score_type": score_type,
                }),


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
                        "block_id": "weight",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "weight"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Enter Max Weight",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
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

}

module.exports = submitScore;