var dayjs = require("dayjs");


const submitTime = (payload, workoutSelected) => {
const { trigger_id } = payload;
    const { _id, name, week, day, startDate, type, description, time, minutes, seconds, completed } = workoutSelected;


    const date = dayjs(startDate).format('dddd MMMM D YYYY');

    const workout = {
        "trigger_id": trigger_id,
        'external_id': _id,
        view: {
            "type": "modal",
            "callback_id": "selected_program_workouts",
            "private_metadata": JSON.stringify({
                "id": _id,

            }),

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
                "text": "Close",
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
                    "block_id": "minutes",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": String(minutes),
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
                    "optional": false,
                    "block_id": "seconds",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": String(seconds),
                        "action_id": "seconds"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Enter Seconds",
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