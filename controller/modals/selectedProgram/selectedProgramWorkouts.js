var dayjs = require("dayjs");


const selectedProgramWorkouts = async (payload, workouts, slashOrHome) => {
const { trigger_id } = payload;
    const shortData = workouts.data[0].selectedProgram;
var paginate = 0;
    var maxRecords = paginate + 6;


    const array = []
    const blockData = (info) => {
        for(paginate;
            (paginate < shortData.length && paginate < maxRecords); paginate++) {

            const slicedDate = info[paginate].startDate.slice(0, -14);
            const date = dayjs(slicedDate).format('dddd MMMM D YYYY');
            const completed = () => {
                if(info[paginate].completed) {
                    if(info[paginate].type === "Time") {
                        return "*You completed this workout on " + dayjs(info[paginate].dateCompleted).format('dddd MMMM D YYYY') + "* \n*in " + info[paginate].minutes + " minutes " + info[paginate].seconds + " seconds!*"
                    } else if(info[paginate].type === "Distance") {
                        return "*You completed this workout on " + dayjs(info[paginate].dateCompleted).format('dddd MMMM D YYYY') + ".* \n *You ran " + info[paginate].miles + " miles!*"
                    }
                }
                return "Workout for: " + date
            };
            const enterNewTime = () => {
                if(info[paginate].completed) {
                    return "Update Score"
                }
                return "Enter Score"

            }

            array.push({
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: completed(),
                   
                },


            }, {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "*Week* " + info[paginate].week + " Day " + info[paginate].day,
                   
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
                    text: "*Descripton:* " + info[paginate].description,
                   
                },

            }, {
                type: "actions",
                elements: [{
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: enterNewTime(),
                        emoji: true
                    },
                    value: "selected_program_score",
                    action_id: "selected_program_score" + info[paginate]._id,

                }]
            }, {
                type: "divider"
            })


        }
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
                    "value": "selected_program_next",
                    "action_id": "selected_program_next"
                }
            ]
        });
        return array;
    }




    const mapWorkouts = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "selected_program_workouts_index",
 "private_metadata": JSON.stringify({
                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.id,
                "selected_program_paginate": String(0)
            }),
            "title": {
                "type": "plain_text",
                "text": shortData[0].name,
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

module.exports = selectedProgramWorkouts;