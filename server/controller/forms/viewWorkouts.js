var dayjs = require("dayjs");

const viewWorkouts = async (trigger_id, workouts) => {

    var shortData;
    if(workouts.data.length === 0) {
        shortData = [];
    } else {
        shortData = workouts.data[0].workouts;
    }
    // const shortData = workouts.data[0].workouts;
    const array = []
    const blockData = (info) => {

        const date = dayjs(info.day).format('dddd MMMM D YYYY')
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

            const date = dayjs(info[i].day).format('dddd MMMM D YYYY')
            ///Beginning to test different workout types below:
            if(info[i].type === "Rounds + Reps") {
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
                                text: "Edit Workout",
                                emoji: true
                            },
                            value: "edit",
                            action_id: info[i]._id
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
            } else if(info[i].type === "Time") {
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
                                text: "Edit Workout",
                                emoji: true
                            },
                            value: "edit",
                            action_id: info[i]._id
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
            } else if(info[i].type === "Load") {
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
                                text: "Edit Workout",
                                emoji: true
                            },
                            value: "edit",
                            action_id: info[i]._id
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

            ///^^^ Testing workout type
            else {
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
                            value: "edit",
                            action_id: info[i]._id
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
        }
        return array;
    }




    const mapWorkouts = {
        "trigger_id": trigger_id,
        "response_action": "clear",
        view: {
            "type": "modal",
            "callback_id": "view_workouts",
            "title": {
                "type": "plain_text",
                "text": "Workouts Created: ",
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

module.exports = viewWorkouts;