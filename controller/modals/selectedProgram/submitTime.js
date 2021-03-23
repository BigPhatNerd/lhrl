var dayjs = require("dayjs");


const submitTime = (payload, workoutSelected, slashOrHome, enter_score_slash) => {
    const { trigger_id } = payload;
    const { _id, name, week, day, startDate, type, description, minutes, seconds, completed, miles } = workoutSelected;
const metadata = JSON.parse(payload.view.private_metadata);
    const { selected_program_paginate } = metadata;

    const date = dayjs(startDate).format('dddd MMMM D YYYY');
    if(type === "Time") {
        const timeWorkout = {
            "trigger_id": trigger_id,
            'external_id': _id,
            view: {
                "type": "modal",
                "callback_id": "selected_program_workouts",
                "private_metadata": JSON.stringify({
                    "id": _id,
                    "home_or_slash": slashOrHome,

                    "enter_score_slash": enter_score_slash,
                    "score_type": type,
                    "selected_program_paginate": String(selected_program_paginate)

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
                "blocks": [ {
            "type": "input",
            "block_id": "radio",
            "element": {
                "type": "radio_buttons",
                "initial_option": {
                    "text": {
                             "type": "plain_text",
                            "text": "Keep this private. 🤫",
                            "emoji": true
                        },
                        "value": "private"
                },
                "options": [
                    {
                        "text": {
                             "type": "plain_text",
                            "text": "Keep this private. 🤫",
                            "emoji": true
                        },
                        "value": "private"
                    },
                    {
                       "text": {
                           "type": "plain_text",
                            "text": "Share with channel 🔊",
                            "emoji":true
                        },
                        "value": "public"
                    }
                ],
                "action_id": "radio_buttons-action"
            },
            "label": {
                "type": "plain_text",
                "text": "Privacy Settings:",
                "emoji": true
            }
        },{
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "*Workout for:* " + date,
                         
                        },


                    }, {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "*Week " + week + " Day " + day + "*",
                           
                        },


                    }, {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "*Type:* " + type,
                         
                        },


                    }, {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "*Descripton:* " + description,
                            
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
        return timeWorkout
    } else if(type === "Distance") {
        const distanceWorkout = {
            "trigger_id": trigger_id,
            'external_id': _id,
            view: {
                "type": "modal",
                "callback_id": "selected_program_workouts",
                "private_metadata": JSON.stringify({
                    "id": _id,
                    "home_or_slash": slashOrHome,
                    "enter_score_slash": enter_score_slash,
                    "score_type": type,
                      "selected_program_paginate": String(selected_program_paginate)


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
                "blocks": [ {
            "type": "input",
            "block_id": "radio",
            "element": {
                "type": "radio_buttons",
                "initial_option": {
                    "text": {
                             "type": "plain_text",
                            "text": "Keep this private. 🤫",
                            "emoji": true
                        },
                        "value": "private"
                },
                "options": [
                    {
                        "text": {
                              "type": "plain_text",
                            "text": "Keep this private. 🤫",
                            "emoji": true
                        },
                        "value": "private"
                    },
                    {
                       "text": {
                           "type": "plain_text",
                            "text": "Share with channel 🔊",
                            "emoji":true
                        },
                        "value": "public"
                    }
                ],
                "action_id": "radio_buttons-action"
            },
            "label": {
                "type": "plain_text",
                "text": "Privacy Settings:",
                "emoji": true
            }
        },{
                        type: "section",
                        text: {
                            "type": "mrkdwn",
                            text: "*Workout for:* " + date,
                           
                        },


                    }, {
                        type: "section",
                        text: {
                            "type": "mrkdwn",
                            text: "*Week " + week + " Day " + day + "*",
                          
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
                            "type": "mrkdwn",
                            text: "*Descripton:* " + description,
                           
                        },

                    },

                    {
                        "type": "input",
                        "optional": false,
                        "block_id": "miles",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": String(miles),
                            "action_id": "miles"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Enter Miles",
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
        return distanceWorkout
    }
}

module.exports = submitTime;