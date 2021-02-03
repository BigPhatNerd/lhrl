const axios = require('axios');
var dayjs = require("dayjs");
const { url } = require("../../../lib/keys");
const urlString = process.env.NODE_ENV === "production" ? "https://immense-shelf-69979.herokuapp.com" : url.development
const updatedWorkouts = async (payload, viewId, workouts, slashOrHome) => {

const metadata = JSON.parse(payload.view.private_metadata);

var { view_paginate } = metadata;
console.log("metadata: ", metadata);
var paginateInteger = parseInt(view_paginate);

if ( payload.actions !== undefined && payload.actions[0].value === "created_next"){
    paginateInteger += 6;
   
} else if (payload.actions !== undefined && payload.actions[0].value === "created_prev"){
    
    paginateInteger -= 6;
}

var maxRecords = paginateInteger + 6;
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
        var i = paginateInteger;
        for(var i; i < shortData.length && i < maxRecords; i++) {

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
          if( paginateInteger >= 6 && (shortData.length - paginateInteger) < 7 ){
            array.push({
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": ":black_left_pointing_double_triangle_with_vertical_bar: Prev",
                        "emoji": true
                    },
                    "value": "created_prev",
                    "action_id": "created_prev"
                },
               
            ]
        }); 
        } else if( paginateInteger <= 0 && (shortData.length - paginateInteger) >= 7){
             array.push({
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "More  :black_right_pointing_double_triangle_with_vertical_bar:",
                        "emoji": true
                    },
                    "value": "created_next",
                    "action_id": "created_next"
                }
            ]
        });
        } else {
        array.push({
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": ":black_left_pointing_double_triangle_with_vertical_bar: Prev",
                        "emoji": true
                    },
                    "value": "completed_prev",
                    "action_id": "created_prev"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "More  :black_right_pointing_double_triangle_with_vertical_bar:",
                        "emoji": true
                    },
                    "value": "completed_next",
                    "action_id": "created_next"
                }
            ]
        });
    }
        return array;
    }




    const mapWorkouts = {
        "view_id": viewId,
        view: {
            "type": "modal",
            "callback_id": "view_workouts",
            "private_metadata": JSON.stringify({
                "home_or_slash": slashOrHome,
                "view_paginate": paginateInteger
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