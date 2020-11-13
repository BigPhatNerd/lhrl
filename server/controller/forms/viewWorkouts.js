const axios = require('axios');
const viewWorkouts = async (trigger_id, username) => {
    const workouts = await axios.get(`https://lhrlslacktest.ngrok.io/slack/get-workouts/${username}`)
    const shortData = workouts.data[0].workouts;
    const array = []
    const blockData = (info) => {
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
                    value: info[i]._id,
                    action_id: info[i]._id
                }]
            }, {
                type: "divider"
            })

        }
        return array;
    }




    const mapWorkouts = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "view_workouts",
            "title": {
                "type": "plain_text",
                "text": "My App",
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
            "blocks": (blockData(shortData))



        }
    }
    return mapWorkouts
}

module.exports = viewWorkouts;