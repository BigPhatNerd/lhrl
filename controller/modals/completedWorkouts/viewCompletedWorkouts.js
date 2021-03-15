var dayjs = require("dayjs");
const {
    activityType,
    getMiles,
    getKilometers,
    timeOfWorkout,
    avgMile,
} = require("../../../utils/strava");

const viewFinishedWorkouts = async (payload, workouts, slashOrHome) => {
    const { trigger_id } = payload;
    const filteredWorkouts = workouts.data[0].finishedWorkouts.filter(
        (workout) => workout.type !== undefined
    );

    var paginate = 0;
    var maxRecords = paginate + 6;
    var shortData;
    if (workouts.data.length === 0) {
        shortData = [];
    } else {
        shortData = filteredWorkouts;
    }
    // const shortData = workouts.data[0].workouts;
    const array = [];
    const blockData = (info) => {
        // const date = dayjs(info.day).format('dddd MMMM D YYYY')
        if (shortData.length === 0) {
            array.push({
                type: "section",
                text: {
                    type: "plain_text",
                    text: "You have not completed any workouts yet.",
                    emoji: true,
                },
            });
            return array;
        }
        for (
            paginate;
            paginate < shortData.length && paginate < maxRecords;
            paginate++
        ) {
            console.log("\n\npaginate: ", paginate);
            const date = dayjs(info[paginate].date).format("dddd MMMM D YYYY");

            ///Beginning to test different workout types below:
            if (info[paginate].type === "Run") {
                array.push(
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "*Date Completed:* " + date,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "*Strava Upload*",
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text:
                                "*Type of Exercise:* " +
                                activityType(info[paginate].type) +
                                "\n" +
                                "*Distance:* " +
                                getMiles(info[paginate].distance) +
                                "miles / " +
                                getKilometers(info[paginate].distance) +
                                "km's\n" +
                                "*Time:* " +
                                timeOfWorkout(info[paginate].seconds) +
                                "\n" +
                                "*Average Speed:* " +
                                avgMile(
                                    info[paginate].seconds,
                                    info[paginate].distance
                                ) +
                                "\n",
                        },
                    },
                    {
                        type: "divider",
                    }
                );
            } else if (info[paginate].type === "Reps") {
                array.push(
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Date Completed: " + date,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Type: " + info[paginate].type,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Name: " + info[paginate].name,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Description: " + info[paginate].description,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Reps: " + info[paginate].reps,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Notes: " + info[paginate].notes,
                            emoji: true,
                        },
                    },
                    {
                        type: "actions",
                        elements: [
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "♻️ Redo Workout ♻️",
                                    emoji: true,
                                },
                                value: "complete_completed_workouts",
                                action_id: "complete" + info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "✏️ Edit Completed Workout ✏️",
                                    emoji: true,
                                },
                                value: "edit_completed_workouts",
                                action_id: info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "🛑 Delete Workout 🛑",
                                    emoji: true,
                                },
                                value: "delete_completed_workouts",
                                action_id: "delete" + info[paginate]._id,
                            },
                        ],
                    },
                    {
                        type: "divider",
                    }
                );
            } else if (info[paginate].type === "Rounds + Reps") {
                array.push(
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Date Completed: " + date,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Type: " + info[paginate].type,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Name: " + info[paginate].name,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Description: " + info[paginate].description,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Rounds: " + info[paginate].rounds,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Reps: " + info[paginate].reps,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Notes: " + info[paginate].notes,
                            emoji: true,
                        },
                    },
                    {
                        type: "actions",
                        elements: [
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "♻️ Redo Workout ♻️",
                                    emoji: true,
                                },
                                value: "complete_completed_workouts",
                                action_id: "complete" + info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "✏️ Edit Completed Workout ✏️",
                                    emoji: true,
                                },
                                value: "edit_completed_workouts",
                                action_id: info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "🛑 Delete Workout 🛑",
                                    emoji: true,
                                },
                                value: "delete_completed_workouts",
                                action_id: "delete" + info[paginate]._id,
                            },
                        ],
                    },
                    {
                        type: "divider",
                    }
                );
            } else if (info[paginate].type === "Time") {
                array.push(
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Date Completed: " + date,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Type: " + info[paginate].type,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Name: " + info[paginate].name,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Description: " + info[paginate].description,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Minutes: " + info[paginate].minutes,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Seconds: " + info[paginate].seconds,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Notes: " + info[paginate].notes,
                            emoji: true,
                        },
                    },
                    {
                        type: "actions",
                        elements: [
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "♻️ Redo Workout ♻️",
                                    emoji: true,
                                },
                                value: "complete_completed_workouts",
                                action_id: "complete" + info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "✏️ Edit Completed Workout ✏️",
                                    emoji: true,
                                },
                                value: "edit_completed_workouts",
                                action_id: info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "🛑 Delete Workout 🛑",
                                    emoji: true,
                                },
                                value: "delete_completed_workouts",
                                action_id: "delete" + info[paginate]._id,
                            },
                        ],
                    },
                    {
                        type: "divider",
                    }
                );
            } else if (info[paginate].type === "Load") {
                array.push(
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Date Completed: " + date,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Type: " + info[paginate].type,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Name: " + info[paginate].name,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Description: " + info[paginate].description,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Weight: " + info[paginate].weight,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Notes: " + info[paginate].notes,
                            emoji: true,
                        },
                    },
                    {
                        type: "actions",
                        elements: [
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "♻️ Redo Workout ♻️",
                                    emoji: true,
                                },
                                value: "complete_completed_workouts",
                                action_id: "complete" + info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "✏️ Edit Completed Workout ✏️",
                                    emoji: true,
                                },
                                value: "edit_completed_workouts",
                                action_id: info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "🛑 Delete Workout 🛑",
                                    emoji: true,
                                },
                                value: "delete_completed_workouts",
                                action_id: "delete" + info[paginate]._id,
                            },
                        ],
                    },
                    {
                        type: "divider",
                    }
                );
            }

            ///^^^ Testing workout type
            else if (info[paginate].type === "Distance") {
                array.push(
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Date Completed: " + date,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Type: " + info[paginate].type,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Name: " + info[paginate].name,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Description: " + info[paginate].description,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Miles: " + info[paginate].miles,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Notes: " + info[paginate].notes,
                            emoji: true,
                        },
                    },
                    {
                        type: "actions",
                        elements: [
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "♻️ Redo Workout ♻️",
                                    emoji: true,
                                },
                                value: "complete_completed_workouts",
                                action_id: "complete" + info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "✏️ Edit Completed Workout ✏️",
                                    emoji: true,
                                },
                                value: "edit_completed_workouts",
                                action_id: info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "🛑 Delete Workout 🛑",
                                    emoji: true,
                                },
                                value: "delete_completed_workouts",
                                action_id: "delete" + info[paginate]._id,
                            },
                        ],
                    },
                    {
                        type: "divider",
                    }
                );
            } else if (info[paginate].type === "Meters") {
                array.push(
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Date Completed: " + date,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Type: " + info[paginate].type,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Name: " + info[paginate].name,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Description: " + info[paginate].description,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Meters: " + info[paginate].meters,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Notes: " + info[paginate].notes,
                            emoji: true,
                        },
                    },
                    {
                        type: "actions",
                        elements: [
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "♻️ Redo Workout ♻️",
                                    emoji: true,
                                },
                                value: "complete_completed_workouts",
                                action_id: "complete" + info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "✏️ Edit Completed Workout ✏️",
                                    emoji: true,
                                },
                                value: "edit_completed_workouts",
                                action_id: info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "🛑 Delete Workout 🛑",
                                    emoji: true,
                                },
                                value: "delete_completed_workouts",
                                action_id: "delete" + info[paginate]._id,
                            },
                        ],
                    },
                    {
                        type: "divider",
                    }
                );
            } else if (info[paginate].type === "Other / Text") {
                array.push(
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Date Completed: " + date,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Type: " + info[paginate].type,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Name: " + info[paginate].name,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Description: " + info[paginate].description,
                            emoji: true,
                        },
                    },
                    {
                        type: "section",
                        text: {
                            type: "plain_text",
                            text: "Notes: " + info[paginate].notes,
                            emoji: true,
                        },
                    },
                    {
                        type: "actions",
                        elements: [
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "♻️ Redo Workout ♻️",
                                    emoji: true,
                                },
                                value: "complete_completed_workouts",
                                action_id: "complete" + info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "✏️ Edit Completed Workout ✏️",
                                    emoji: true,
                                },
                                value: "edit_completed_workouts",
                                action_id: info[paginate]._id,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "🛑 Delete Workout 🛑",
                                    emoji: true,
                                },
                                value: "delete_completed_workouts",
                                action_id: "delete" + info[paginate]._id,
                            },
                        ],
                    },
                    {
                        type: "divider",
                    }
                );
            }
        }
        if (shortData.length > 6) {
            array.push({
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text:
                                "More :black_right_pointing_double_triangle_with_vertical_bar:",
                            emoji: true,
                        },
                        value: "completed_next",
                        action_id: "completed_next",
                    },
                ],
            });
        }
        return array;
    };

    const mapWorkouts = {
        trigger_id: trigger_id,
        response_action: "clear",
        view: {
            type: "modal",
            callback_id: "view_workouts",
            private_metadata: JSON.stringify({
                home_or_slash: slashOrHome,
                homeModal_view_id: payload.view.root_view_id,
                paginate: String(0),
            }),
            title: {
                type: "plain_text",
                text: "Workouts Completed: ",
                emoji: true,
            },
            submit: {
                type: "plain_text",
                text: "Submit",
                emoji: true,
            },

            close: {
                type: "plain_text",
                text: "Cancel",
                emoji: true,
            },
            blocks: blockData(shortData),
        },
    };

    return mapWorkouts;
};

module.exports = viewFinishedWorkouts;
