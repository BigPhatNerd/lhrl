const axios = require('axios');
var dayjs = require("dayjs");
const updatedProgramWorkouts = async (viewId, username) => {
    const workouts = await axios.get(`http://lhrlslacktest.ngrok.io/programs/selectedProgram/get-workouts/${username}`);

    const shortData = workouts.data[0].selectedProgram;

    const array = [];

    const blockData = (info) => {
        for(var i = 0; i < shortData.length; i++) {
            const slicedDate = info[i].startDate.slice(0, -14);
            const date = dayjs(slicedDate).format('dddd MMMM D YYYY')

            array.push({
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
                    text: "Week " + info[i].week + " Day " + info[i].day,
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
                    text: "Descripton: " + info[i].description,
                    emoji: true
                },

            }, {
                type: "actions",
                elements: [{
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Enter Score",
                        emoji: true
                    },
                    value: "selected_program_score",
                    action_id: "selected_program_score" + info[i]._id,

                }]
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
            "callback_id": "selected_program_workouts",

            "title": {
                "type": "plain_text",
                "text": shortData[0].name,
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

module.exports = updatedProgramWorkouts;