var dayjs = require("dayjs");

const viewMarathon = async (payload, workouts, slashOrHome, publicChannels) => {
    const channelOptions = publicChannels.map(channel =>{
        return {
                                "text": {
                                    "type": "plain_text",
                                    "text": channel,
                                    "emoji": true
                                },
                                "value": channel,
                            }
    })

const staticSelect = {
                    "type": "section",
                    "block_id": "type",
                    "text": {
                        "type": "plain_text",
                        "text": "Keep private 🤫 or post to channel 🔊",
                        "emoji": true
                    },
                    "accessory": {
                        "type": "static_select",

                        "placeholder": {
                            "type": "plain_text",
                            "text": "Keep private 🤫" ,

                            "emoji": true
                        },
                        "options": channelOptions,
                        "action_id": "public_private"
                    }
                }

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
array.push(staticSelect,
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
                    text: "*Type*: " + info[i].type,
                    
                },


            }, {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*Description*: " + info[i].description,
                  
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
            "callback_id": "subscribe_to_marathon",
             "private_metadata": JSON.stringify({
                "distance": "marathon",
                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.id
            }),
            "title": {
                "type": "plain_text",
                "text": "Marathon Workouts: ",
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

module.exports = viewMarathon;