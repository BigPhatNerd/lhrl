var dayjs = require("dayjs");

const updatedCalendarWorkouts = async (payload, viewId, workouts, slashOrHome) => {
    const { trigger_id } = payload;
    console.log("\n\n\n\n\nthis is firing: ");

    const metadata = JSON.parse(payload.view.private_metadata);
    const { calendar_date } = metadata;
    console.log("metadata: ", metadata);


    var date = typeof payload.view.state.values?.modal_calendar?.modal_calendar?.selected_date === "undefined" || !payload.view.state.values.modal_calendar ? calendar_date : payload.view.state.values.modal_calendar.modal_calendar.selected_date;
    date = dayjs(date).format('YYYY-MM-D');
    console.log("date: ", date);
    const filteredWorkouts = await workouts.data[0].finishedWorkouts.filter(workouts => {
        const formatedDate = dayjs(workouts.date).format('YYYY-MM-D');
        return date === formatedDate
    });


    const array = [];

    const blockData = (info) => {

        // const date = dayjs(info.day).format('dddd MMMM D YYYY')
        if(filteredWorkouts.length === 0) {
            array.push({
                "type": "actions",
                "block_id": "modal_calendar",
                "elements": [{
                    "type": "datepicker",
                    "initial_date": date,
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select a date",
                        "emoji": true
                    },
                    "action_id": "modal_calendar",

                }]
            }, {

                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "You did not complete any workouts on this date.",

                }

            })
            return array
        }
        array.push({
            "type": "actions",
            "block_id": "modal_calendar",
            "elements": [{
                "type": "datepicker",
                "initial_date": date,
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select a date",
                    "emoji": true
                },
                "action_id": "modal_calendar",

            }]
        })

        for(var i = 0;
            (i < filteredWorkouts.length && i < 6); i++) {

            const workoutDate = dayjs(info[i].date).format('dddd MMMM D YYYY')
            ///Beginning to test different workout types below:
            if(info[i].type === "Reps") {
                array.push({
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: "Date Completed: " + workoutDate,
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
                            value: "calendar_workouts",
                            action_id: "calendar" + info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_calendar_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_calendar_workouts",
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
                            value: "calendar_workouts",
                            action_id: "calendar" + info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_calendar_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_calendar_workouts",
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
                            value: "calendar_workouts",
                            action_id: "calendar" + info[i]._id
                        }, {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_calendar_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_calendar_workouts",
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
                            value: "calendar_workouts",
                            action_id: "calendar" + info[i]._id
                        }, {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_calendar_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_calendar_workouts",
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
                            value: "calendar_workouts",
                            action_id: "calendar" + info[i]._id
                        }, {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_calendar_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_calendar_workouts",
                            action_id: "delete" + info[i]._id,

                        }
                    ]
                }, {
                    type: "divider"
                })
            } else if(info[i].type === "Meters") {
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
                        text: "Meters: " + info[i].meters,
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
                            value: "calendar_workouts",
                            action_id: "calendar" + info[i]._id
                        }, {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_calendar_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_calendar_workouts",
                            action_id: "delete" + info[i]._id,

                        }
                    ]
                }, {
                    type: "divider"
                })
            } else if(info[i].type === "Other / Text") {
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
                            value: "calendar_workouts",
                            action_id: "calendar" + info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Edit Completed Workout",
                                emoji: true
                            },
                            value: "edit_calendar_workouts",
                            action_id: info[i]._id
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Delete Workout",
                                emoji: true
                            },
                            value: "delete_calendar_workouts",
                            action_id: "delete" + info[i]._id,

                        }
                    ]
                }, {
                    type: "divider"
                })
            }

        }
        return array
    }




    const mapWorkouts = {
        "view_id": viewId,
        view: {
            "type": "modal",
            "callback_id": "view_calendar_workouts",
            "private_metadata": JSON.stringify({
                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.id,
                "calendar_date": date



            }),

            "title": {
                "type": "plain_text",
                "text": dayjs(date).format('MMM-D-YYYY') + " Workouts",
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
            "blocks": (blockData(filteredWorkouts))



        }
    }
    return mapWorkouts
}

module.exports = updatedCalendarWorkouts;