var dayjs = require("dayjs");


const submitTime = (trigger_id, workoutSelected) => {
    const { _id, name, week, day, startDate, type, description } = workoutSelected;

    const date = dayjs(startDate).format('dddd MMMM D YYYY');

    const workout = {
        "trigger_id": trigger_id,
        'external_id': _id,
        view: {
            "type": "modal",
            "callback_id": "selected_program_workouts",
            "private_metadata": _id,

            "title": {
                "type": "plain_text",
                "text": "Selected Program",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true,

            },
            "close": {
                "type": "plain_text",
                "text": "Take Me Home",
                "emoji": true
            },
            "blocks": [{
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Workout for: " + date,
                        emoji: true
                    },


                }, {
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Week " + week + " Day " + day,
                        emoji: true
                    },


                }, {
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Type: " + type,
                        emoji: true
                    },


                }, {
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Descripton: " + description,
                        emoji: true
                    },

                },

                {
                    "type": "input",
                    "optional": false,
                    "block_id": "time",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "time"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Enter Time",
                        "emoji": true
                    }
                },
                {
                    type: "divider"
                }
            ]
        }

    }
    return workout
}

module.exports = submitTime;