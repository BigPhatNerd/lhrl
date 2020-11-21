const axios = require('axios');
const updatedWorkouts = async (viewId, username) => {
    const workouts = await axios.get(`https://lhrlslacktest.ngrok.io/slack/get-workouts/${username}`)
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

            array.push({
                type: "section",
                text: {
                    type: "plain_text",
                    text: "Date Created: " + info[i].day,
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
                    text: "Sets: " + info[i].sets,
                    emoji: true
                },

            }, {
                type: "section",
                text: {
                    type: "plain_text",
                    text: "Reps: " + info[i].reps,
                    emoji: true
                },

            }, {
                type: "actions",
                elements: [{
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Edit Workout",
                            emoji: true
                        },
                        value: "updated" + info[i]._id,
                        action_id: "updated" + info[i]._id
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Delete Workout",
                            emoji: true
                        },
                        value: "delete",
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
            "title": {
                "type": "plain_text",
                "text": "Workouts Created: ",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Take Me Home",
                "emoji": true
            },
            "blocks": (blockData(shortData))



        }
    }
    return mapWorkouts
}

module.exports = updatedWorkouts;