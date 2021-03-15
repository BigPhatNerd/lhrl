const axios = require("axios");
var dayjs = require("dayjs");
const { url } = require("../../../lib/keys");
const urlString =
    process.env.NODE_ENV === "production" ? url.production : url.development;
const updatedProgramWorkouts = async (
    payload,
    viewId,
    workouts,
    slashOrHome
) => {
    const metadata = JSON.parse(payload.view.private_metadata);

    var { selected_program_paginate } = metadata;

    var paginateInteger = parseInt(selected_program_paginate);

    if (
        payload.actions !== undefined &&
        payload.actions[0].value === "selected_program_next"
    ) {
        paginateInteger += 6;
    } else if (
        payload.actions !== undefined &&
        payload.actions[0].value === "selected_program_prev"
    ) {
        paginateInteger -= 6;
    }

    var maxRecords = paginateInteger + 6;
    const shortData = workouts.data[0].selectedProgram;

    const array = [];

    const blockData = (info) => {
        var i = paginateInteger;
        for (var i; i < shortData.length && i < maxRecords; i++) {
            const slicedDate = info[i].startDate.slice(0, -14);
            const date = dayjs(slicedDate).format("dddd MMMM D YYYY");

            const completed = () => {
                if (info[i].completed) {
                    if (info[i].type === "Time") {
                        return (
                            "*You completed this workout on " +
                            dayjs(info[i].dateCompleted).format(
                                "dddd MMMM D YYYY"
                            ) +
                            "* \n *in " +
                            info[i].minutes +
                            " minutes " +
                            info[i].seconds +
                            " seconds!*"
                        );
                    } else if (info[i].type === "Distance") {
                        return (
                            "*You completed this workout on " +
                            dayjs(info[i].dateCompleted).format(
                                "dddd MMMM D YYYY"
                            ) +
                            ".* \n *You ran " +
                            info[i].miles +
                            " miles!*"
                        );
                    }
                }
                return "Workout for: " + date;
            };
            const enterNewTime = () => {
                if (info[i].completed) {
                    return "⬆️ Update Score ⬆️";
                }
                return "✅ Enter Score ✅";
            };
            array.push(
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: completed(),
                    },
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text:
                            "*Week " +
                            info[i].week +
                            " Day " +
                            info[i].day +
                            "*",
                    },
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "*Type:* " + info[i].type,
                    },
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "*Descripton:* " + info[i].description,
                    },
                },
                {
                    type: "actions",
                    elements: [
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: enterNewTime(),
                                emoji: true,
                            },
                            value: "selected_program_score",
                            action_id: "selected_program_score" + info[i]._id,
                        },
                    ],
                },
                {
                    type: "divider",
                }
            );
        }
        if (paginateInteger >= 6 && shortData.length - paginateInteger < 7) {
            array.push({
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text:
                                ":black_left_pointing_double_triangle_with_vertical_bar: Prev",
                            emoji: true,
                        },
                        value: "selected_program_prev",
                        action_id: "selected_program_prev",
                    },
                ],
            });
        } else if (
            paginateInteger <= 0 &&
            shortData.length - paginateInteger >= 7
        ) {
            array.push({
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text:
                                "More  :black_right_pointing_double_triangle_with_vertical_bar:",
                            emoji: true,
                        },
                        value: "selected_program_next",
                        action_id: "selected_program_next",
                    },
                ],
            });
        } else {
            console.log("why am I here and nothing else?");
            array.push({
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text:
                                ":black_left_pointing_double_triangle_with_vertical_bar: Prev",
                            emoji: true,
                        },
                        value: "selected_program_prev",
                        action_id: "selected_program_prev",
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text:
                                "More  :black_right_pointing_double_triangle_with_vertical_bar:",
                            emoji: true,
                        },
                        value: "selected_program_next",
                        action_id: "selected_program_next",
                    },
                ],
            });
        }
        return array;
    };

    const mapWorkouts = {
        view_id: viewId,
        view: {
            type: "modal",
            callback_id: "selected_program_workouts_index",
            private_metadata: JSON.stringify({
                home_or_slash: slashOrHome,
                selected_program_paginate: paginateInteger,
            }),

            title: {
                type: "plain_text",
                text: shortData[0].name,
                emoji: true,
            },
            submit: {
                type: "plain_text",
                text: "Submit",
                emoji: true,
            },
            close: {
                type: "plain_text",
                text: "Close",
                emoji: true,
            },
            blocks: blockData(shortData),
        },
    };
    return mapWorkouts;
};

module.exports = updatedProgramWorkouts;
