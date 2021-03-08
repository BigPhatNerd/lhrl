var dayjs = require("dayjs");

const viewWorkouts = async (payload, workouts, slashOrHome) => {
    const { trigger_id } = payload;

    var paginate = 0;
    var maxRecords = paginate + 6;
    var shortData;
    if(workouts.data.length === 0) {
        shortData = [];
    } else {
        shortData = workouts.data[0].workouts;
    }
    // const shortData = workouts.data[0].workouts;
    const array = [];

    const blockData = (info) => {

        // const date = dayjs(info.day).format('dddd MMMM D YYYY')
        if(shortData.length === 0) {
            array.push({

                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": "You have not created any workouts yet.",
                    "emoji": true
                }

            })
        }

        for(paginate;
            (paginate < shortData.length && paginate < maxRecords); paginate++) {

            const date = dayjs(info[paginate].date).format('dddd MMMM D YYYY')
            ///Beginning to test different workout types below:
            array.push({
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*Date Created:* " + date,

                },


            }, {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*Type:* " + info[paginate].type,

                },


            }, {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*Name:* " + info[paginate].name,

                },
            }, {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*Description:* " + info[paginate].description,

                },

            }, {
                type: "actions",
                elements: [{
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Complete Workout",
                            emoji: true
                        },
                        value: "complete_created_workouts",
                        action_id: "complete" + info[paginate]._id
                    }, {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Edit Workout",
                            emoji: true
                        },
                        value: "edit_created_workouts",
                        action_id: info[paginate]._id
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Delete Workout",
                            emoji: true
                        },
                        value: "delete_created_workouts",
                        action_id: "delete" + info[paginate]._id,

                    }
                ]
            }, {
                type: "divider"
            })

            ///^^^ Testing workout type

        }
        if(shortData.length > 6) {
            array.push({
                "type": "actions",
                "elements": [

                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "More :black_right_pointing_double_triangle_with_vertical_bar:",
                            "emoji": true
                        },
                        "value": "created_next",
                        "action_id": "created_next"
                    }
                ]
            });
        }
        return array;
    }




    const mapWorkouts = {
        "trigger_id": trigger_id,
        "response_action": "clear",
        view: {
            "type": "modal",
            "callback_id": "view_workouts",
            "private_metadata": JSON.stringify({
                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.id,
                "view_paginate": String(0)

            }),

            "title": {
                "type": "plain_text",
                "text": "Workouts Created: ",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true,

            },

            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": (blockData(shortData))



        }
    }
    return mapWorkouts
}

module.exports = viewWorkouts;