const axios = require('axios');
var dayjs = require("dayjs");
const { url } = require('../../../lib/keys');

const urlString = process.env.NODE_ENV === "production" ? url.production : url.development
const updatedCompletedWorkouts = async (payload, viewId, workouts, slashOrHome) => {
const filteredWorkouts = workouts.data[0].finishedWorkouts.filter(workout => workout.type !== undefined);
const metadata = JSON.parse(payload.view.private_metadata);
console.log("metadat: ", metadata);
var { paginate } = metadata;
//Check payload to see if that last button pressed was delete, in which case paginateInteger DOES NOT CHANGE

var paginateInteger = parseInt(paginate);

if ( payload.actions !== undefined && payload.actions[0].value === "completed_next"){
    paginateInteger += 6;
   
} else if (payload.actions !== undefined && payload.actions[0].value === "completed_prev"){
    
    paginateInteger -= 6;
}

var maxRecords = paginateInteger + 6;

    const shortData = filteredWorkouts;
  
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
   var i = paginateInteger  
   console.log("paginateInteger: ", paginateInteger);
   console.log("paginate: ", paginate);
   console.log("metadata: ", metadata);  

        for(i; (i < shortData.length && i < maxRecords); i++) {

            const date = dayjs(info[i].date).format('dddd MMMM D YYYY');

            ///Beginning to test different workout types below:
            if(info[i].type === "Reps") {
                array.push({
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Date Completed: " + date,
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
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Reps: " + info[i].reps,
                        emoji: true
                    },

                }, {
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Notes: " + info[i].notes,
                        emoji: true
                    },

                }, {
                    type: "actions",
                    elements: [{
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Redo Workout",
                                emoji: true
                            },
                            value: "complete_completed_workouts",
                            action_id: "complete" + info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_completed_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_completed_workouts",
                            action_id: "delete" + info[i]._id,

                        }
                    ]
                }, {
                    type: "divider"
                })
            } else if(info[i].type === "Rounds + Reps") {
                array.push({
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Date Completed: " + date,
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
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Rounds: " + info[i].rounds,
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
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Notes: " + info[i].notes,
                        emoji: true
                    },

                }, {
                    type: "actions",
                    elements: [{
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Redo Workout",
                                emoji: true
                            },
                            value: "complete_completed_workouts",
                            action_id: "complete" + info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_completed_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_completed_workouts",
                            action_id: "delete" + info[i]._id,

                        }
                    ]
                }, {
                    type: "divider"
                })
            } else if(info[i].type === "Time") {
                array.push({
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Date Completed: " + date,
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
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Minutes: " + info[i].minutes,
                        emoji: true
                    },

                }, {
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Seconds: " + info[i].seconds,
                        emoji: true
                    },

                }, {
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Notes: " + info[i].notes,
                        emoji: true
                    },

                }, {
                    type: "actions",
                    elements: [{
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Redo Workout",
                                emoji: true
                            },
                            value: "complete_completed_workouts",
                            action_id: "complete" + info[i]._id
                        }, {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_completed_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_completed_workouts",
                            action_id: "delete" + info[i]._id,

                        }
                    ]
                }, {
                    type: "divider"
                })
            } else if(info[i].type === "Load") {
                array.push({
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Date Completed: " + date,
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
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Weight: " + info[i].weight,
                        emoji: true
                    },

                }, {
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Notes: " + info[i].notes,
                        emoji: true
                    },

                }, {
                    type: "actions",
                    elements: [{
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Redo Workout",
                                emoji: true
                            },
                            value: "complete_completed_workouts",
                            action_id: "complete" + info[i]._id
                        }, {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_completed_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_completed_workouts",
                            action_id: "delete" + info[i]._id,

                        }
                    ]
                }, {
                    type: "divider"
                })
            }

            ///^^^ Testing workout type
            else if(info[i].type === "Distance") {
                array.push({
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Date Completed: " + date,
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
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Miles: " + info[i].miles,
                        emoji: true
                    },

                }, {
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Notes: " + info[i].notes,
                        emoji: true
                    },

                }, {
                    type: "actions",
                    elements: [{
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Redo Workout",
                                emoji: true
                            },
                            value: "complete_completed_workouts",
                            action_id: "complete" + info[i]._id
                        }, {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_completed_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_completed_workouts",
                            action_id: "delete" + info[i]._id,

                        }
                    ]
                }, {
                    type: "divider"
                })
            }
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
                    "value": "completed_prev",
                    "action_id": "completed_prev"
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
                        "text": "More :black_right_pointing_double_triangle_with_vertical_bar:",
                        "emoji": true
                    },
                    "value": "completed_next",
                    "action_id": "completed_next"
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
                    "action_id": "completed_prev"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "More :black_right_pointing_double_triangle_with_vertical_bar:",
                        "emoji": true
                    },
                    "value": "completed_next",
                    "action_id": "completed_next"
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
                "paginate": paginateInteger

            }),
            "title": {
                "type": "plain_text",
                "text": "Workouts Completed: ",
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

module.exports = updatedCompletedWorkouts;