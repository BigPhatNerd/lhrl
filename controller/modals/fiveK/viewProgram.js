var dayjs = require("dayjs");

const view5KProgram = async (payload, workouts, slashOrHome) => {
    const { trigger_id } = payload;

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
array.push({
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
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":arrow_down: *Two-Week Glance* :arrow_down:",
                
            }
        })
        for(var i = 0; i < 6; i++) {

            array.push({
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*Week " + (info[i].week) + " Day " + info[i].day + "*",
                    
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
                    text: "*Description:* " + info[i].description,
                    
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
            "private_metadata": JSON.stringify({
                "distance": "5K",
                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.id
            }),
            
            "title": {
                "type": "plain_text",
                "text": "5K Workouts:",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Subscribe to plan",
                "emoji": true,

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

module.exports = view5KProgram;