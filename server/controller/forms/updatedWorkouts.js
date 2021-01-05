const axios = require('axios');
var dayjs = require("dayjs");
const updatedWorkouts = async (viewId, username) => {
    const workouts = await axios.get(`https://lhrlslacktest.ngrok.io/slack/get-workouts/${username}`)
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
        for(var i = 0; i < shortData.length; i++) {

            const date = dayjs(info[i].day).format('dddd MMMM D YYYY');
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
            } else if(info[i].type === "Distance") {
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
            } else {
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
                            value: "edit_created_workouts" + info[i]._id,
                            action_id: "edit_created_workouts" + info[i]._id
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
        }
        return array;
    }




    const mapWorkouts = {
        "view_id": viewId,
        view: {
            "type": "modal",
            "callback_id": "view_workouts",
            "title": {
                "type": "plain_text",
                "text": "Workouts Created: ",
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

module.exports = updatedWorkouts;