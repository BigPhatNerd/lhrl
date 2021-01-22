const axios = require('axios');
var dayjs = require("dayjs");
const { url } = require("../../../lib/keys");
const urlString = process.env.NODE_ENV === "production" ? "https://immense-shelf-69979.herokuapp.com" : url.development
const updatedWorkouts = async (viewId, workouts, user_id, homeModal_view_id) => {

    const shortData = workouts.data[0].workouts;
    const array = []
    const blockData = (info) => {
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
        for(var i = 0; i < shortData.length; i++) {

            const date = dayjs(info[i].day).format('dddd MMMM D YYYY');

            array.push({
                type: "section",
                text: {
                    type: "plain_text",
                    text: "Date Created: " + date,
                    emoji: true
                },


            }, {
                type: "section",
                text: {
                    type: "plain_text",
                    text: "Type: " + info[i].type,
                    emoji: true
                },


            }, {
                type: "section",
                text: {
                    type: "plain_text",
                    text: "Name: " + info[i].name,
                    emoji: true
                },


            }, {
                type: "section",
                text: {
                    type: "plain_text",
                    text: "Description: " + info[i].description,
                    emoji: true
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

        }
        return array;
    }




    const mapWorkouts = {
        "view_id": viewId,
        view: {
            "type": "modal",
            "callback_id": "view_workouts",
            "private_metadata": JSON.stringify({
                "homeModal_view_id": homeModal_view_id,
            }),
            "title": {
                "type": "plain_text",
                "text": "Workouts Created: ",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Close",
                "emoji": true
            },
            "blocks": (blockData(shortData))



        }
    }
    return mapWorkouts
}

module.exports = updatedWorkouts;