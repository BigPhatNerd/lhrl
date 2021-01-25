var dayjs = require("dayjs");

const viewFinishedWorkouts = async (payload, workouts, slashOrHome) => {
    const { trigger_id } = payload;

    var shortData;
    if(workouts.data.length === 0) {
        shortData = [];
    } else {
        shortData = workouts.data[0].finishedWorkouts;
    }
    // const shortData = workouts.data[0].workouts;
    const array = []
    const blockData = (info) => {

        // const date = dayjs(info.day).format('dddd MMMM D YYYY')
        if(shortData.length === 0) {
            array.push({

                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": "You have not completed any workouts yet.",
                    "emoji": true
                }

            })
        }
        for(var i = 0; i < shortData.length; i++) {

            const date = dayjs(info[i].date).format('dddd MMMM D YYYY');

            ///Beginning to test different workout types below:
            if(info[i].type === "Rounds + Reps") {
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
        return array;
    }




    const mapWorkouts = {
        "trigger_id": trigger_id,
        "response_action": "clear",
        view: {
            "type": "modal",
            "callback_id": "view_workouts",
            "private_metadata": JSON.stringify({
                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.root_view_id,

            }),
            "title": {
                "type": "plain_text",
                "text": "Workouts Completed: ",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true,

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

module.exports = viewFinishedWorkouts;