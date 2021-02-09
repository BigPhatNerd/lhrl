var dayjs = require("dayjs");

const viewCalendarWorkouts = async (payload, workouts, slashOrHome) => {
    const { trigger_id } = payload;
    var date = payload.view.state.values.calendar.calendar.selected_date;
    date = dayjs(date).format('YYYY-MM-D');

    const filteredWorkouts = await workouts.data[0].finishedWorkouts.filter(workouts => {
        const formatedDate = dayjs(workouts.date).format('YYYY-MM-D');
        return date === formatedDate
    });


    const array = [];

    const blockData = (info) => {

        // const date = dayjs(info.day).format('dddd MMMM D YYYY')
        if(filteredWorkouts.length === 0) {
            array.push({

                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "You did not complete any workouts on this date.",

                }

            })
        }

        for(var i = 0;
            (i < filteredWorkouts.length || i < 6); i++) {

            const date = dayjs(info[i].date).format('dddd MMMM D YYYY')
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
                    text: "*Type:* " + info[i].type,

                },


            }, {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*Name:* " + info[i].name,

                },
            }, {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*Description:* " + info[i].description,

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
                        action_id: "complete" + info[i]._id
                    }, {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Edit Workout",
                            emoji: true
                        },
                        value: "edit_created_workouts",
                        action_id: info[i]._id
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Delete Workout",
                            emoji: true
                        },
                        value: "delete_created_workouts",
                        action_id: "delete" + info[i]._id,

                    }
                ]
            }, {
                type: "divider"
            })

            ///^^^ Testing workout type

        }

        return array;
    }




    const mapWorkouts = {
        "trigger_id": trigger_id,
        "response_action": "clear",
        view: {
            "type": "modal",
            "callback_id": "view_calendar_workouts",
            "private_metadata": JSON.stringify({
                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.id,
                "view_paginate": String(0)

            }),

            "title": {
                "type": "plain_text",
                "text": "Workouts Completed: ",
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
            "blocks": (blockData(filteredWorkouts))



        }
    }
    return mapWorkouts
}

module.exports = viewCalendarWorkouts;