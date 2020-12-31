var dayjs = require("dayjs");

const view5KProgram = async (trigger_id, workouts) => {

    const shortData = workouts.data;
    const array = [{
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "Select a date when you would like your program to begin.",
                "emoji": true
            }
        },
        {
            "type": "input",
            "block_id": "date",
            "element": {
                "type": "datepicker",
                "initial_date": dayjs().format('YYYY-MM-D'),
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select a date",
                    "emoji": true
                },
                "action_id": "date"
            },
            "label": {
                "type": "plain_text",
                "text": "Start date:",
                "emoji": true
            }
        },
        {
            type: "divider"
        }
    ]
    const blockData = (info) => {
        // const date = dayjs(info.day).format('MMMM D YYYY, h:mm:ss a')

        for(var i = 0; i < shortData.length; i++) {

            array.push({
                type: "section",
                text: {
                    type: "plain_text",
                    text: "Week " + (info[i].week) + " Day " + info[i].day,
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
                    text: "Description: " + info[i].description,
                    emoji: true
                },


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
            "callback_id": "subscribe_to_5k",
            "private_metadata": "5K",
            "title": {
                "type": "plain_text",
                "text": "5K Workouts: ",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Subscribe to plan",
                "emoji": true,

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

module.exports = view5KProgram;