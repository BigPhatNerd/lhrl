var dayjs = require('dayjs');
const axios = require('axios');
const sendGraphView = require('../../message-handlers/helpers/sendGraphView');
const {
    goalCount,
    goalSummary,
    graphTotals,
    accumulatedReps,
    graphPercentage
} = require('../../message-handlers/helpers/weeklyGoals');
const {
    activityType,
    getMiles,
    getKilometers,
    timeOfWorkout,
    avgMile
} = require('../../../utils/strava');
var weekOfYear = require('dayjs/plugin/weekOfYear');
dayjs.extend(weekOfYear)
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc);
const { url } = require('../../../lib/keys');
const urlString = process.env.NODE_ENV === "production" ? url.production : url.development


module.exports = {
    authorizePrograms: (allWorkouts) => {
        //
        if(allWorkouts.data[0].authorizeStrava) {
            const stravaButton = {
                "type": "actions",
                "elements": [{
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Deauthorize Strava",
                        "emoji": true
                    },
                    "value": "Deauthorize Strava",
                    "action_id": "Deauthorize Strava"
                }]
            };
            return stravaButton
        }

        const stravaButton = {
            "type": "actions",
            "elements": [{
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "🏃 Authorize Strava 🏃‍",
                    "emoji": true
                },
                "value": "Authorize Strava",
                "url": `${urlString}/strava/login`,
                "action_id": "Authorize Strava"
            }]
        };
        return stravaButton
    },


    divider: () => {
        const divider = {
            "type": "divider"
        };
        return divider
    },
    welcome: () => {

        const welcomeMessage = {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "LHRL® App",
                "emoji": true
            }


        }
        return welcomeMessage
    },
    currentlySubscribed: (allWorkouts) => {



        if(allWorkouts.data.length === 0 || allWorkouts.data[0].selectedProgram.length === 0) {
            const noProgram = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "You are currently not subscribed to any programs."

                }
            };
            return noProgram
        }

        const program = allWorkouts.data[0].selectedProgram[0].name;
        const hasProgram = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Currently subscribed to:* " + program

            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "View Program Workouts",
                    "emoji": true
                },
                "value": "program_workouts",
                "action_id": "program_workouts"
            }
        };


        return hasProgram
    },
    viewOrComplete: () => {
        const view = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "View or Complete a Workout:"
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": true
                },
                "options": [{
                        "text": {
                            "type": "plain_text",
                            "text": "View Created Workouts",
                            "emoji": true
                        },
                        "value": "view_workout"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "View Completed Workouts",
                            "emoji": true
                        },
                        "value": "completed_workouts"
                    },

                ],
                "action_id": "create_edit_view"
            }
        }
        return view
    },
    createWorkout: () => {
        const view = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Create a Workout:"
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select workout type",
                    "emoji": true
                },
                "options": [{
                        "text": {
                            "type": "plain_text",
                            "text": "Reps",
                            "emoji": true
                        },
                        "value": "reps",
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Rounds + Reps",
                            "emoji": true
                        },
                        "value": "rounds_plus_reps",
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Time",
                            "emoji": true
                        },
                        "value": "time"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Load",
                            "emoji": true
                        },
                        "value": "load"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Distance",
                            "emoji": true
                        },
                        "value": "distance"
                    },


                ],
                "action_id": "create"
            }
        }
        return view
    },
    header: (title) => {
        const view = {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": title,
                "emoji": true
            }
        }
        return view
    },
    choosePlan: () => {
        const view = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Choose a plan:"
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": true
                },
                "options": [{
                        "text": {
                            "type": "plain_text",
                            "text": "6-Weeks to 5K",
                            "emoji": true
                        },
                        "value": "5K",
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "6-Weeks to 10K",
                            "emoji": true
                        },
                        "value": "10K"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "12-Weeks to Half-Marathon",
                            "emoji": true
                        },
                        "value": "halfMarathon"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "12-Weeks to Marathon",
                            "emoji": true
                        },
                        "value": "marathon"
                    },

                ],
                "action_id": "choose_plan"
            }
        }
        return view
    },


    removeFromProgram: (allWorkouts) => {
        // const program = (userProgram.data[0].selectedProgram.length === 0) ? "" : userProgram.data[0].selectedProgram[0].name;
        if(allWorkouts.data.length === 0 || allWorkouts.data[0].selectedProgram.length === 0) {
            const divider = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Select *_Choose a plan_*  above to subscribe to training plan."
                }
            };
            return divider
        }
        const program = allWorkouts.data[0].selectedProgram[0].name
        const removeProgram = {

            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Remove me from program:* " + program

            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "🚮 Remove Plan 🚮",
                    "emoji": true
                },
                "value": "remove_workouts",
                "action_id": "remove_workouts"
            }
        };
        return removeProgram


    },

    todaysWorkout: (allWorkouts) => {
        const currentDate = dayjs().format('dddd MMMM D YYYY');
        if(allWorkouts.data.length === 0 || allWorkouts.data[0].selectedProgram.length === 0) {
            const noPrograms = {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": "You have no scheduled workouts.",
                    "emoji": true
                },
            }
            return noPrograms;
        }
        const findWorkout = allWorkouts.data[0].selectedProgram.filter(workout => {
            return dayjs(workout.startDate).format('dddd MMMM D YYYY') === currentDate
        });


        const noWorkoutsToday = {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "You have no workouts scheduled for today! 😎",
                "emoji": true
            },
        };

        if(findWorkout.length === 0) {
            return noWorkoutsToday
        } else if(findWorkout.length === 1 && findWorkout[0].completed) {
            const { minutes, seconds, miles, meters } = findWorkout[0];
            if(findWorkout[0].type === "Distance") {
                const alreadyFinishedDistanceWorkout = {

                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*You have already finished today's workout and completed:* " + miles + " miles. :beach_with_umbrella: "

                    },
                };
                return alreadyFinishedDistanceWorkout
            } else if(findWorkout[0].type === "Time") {
                const alreadyFinishedTimeWorkout = {

                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*You have already finished today's workout with a time of:* \n" + minutes + " minutes and " + seconds + " seconds :beach_with_umbrella: "

                    },
                };
                return alreadyFinishedTimeWorkout
            }
        }
        const { week, day, type, description, _id } = findWorkout[0];
        const workoutForToday = {

            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Today's scheduled workout:* \n Week " + week + " Day " + day + "\nType: " + type + "\nDescription: " + description

            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Enter Score",
                    "emoji": true
                },
                "value": "daily_program_score",
                "action_id": "daily_program_score" + _id
            }
        };
        return workoutForToday
    },


    weeklyGoals: (allWorkouts) => {
        //If the week has changed, reset goals

        const noGoalsSet = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*You currently have no goals set*"

            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "🎯 Set Weekly Goals 🎯",
                    "emoji": true
                },
                "value": "weekly_goal",
                "action_id": "weekly_goal"
            }
        }

        if(allWorkouts.data.length === 0 || allWorkouts.data[0].weeklyGoals.length === 0) {
            return noGoalsSet;
        }
        const now = dayjs().format('MMMM D, YYYY h:mm A');

        const currentDate = dayjs(allWorkouts.data[0].weeklyGoals[0].date).format('MMMM D, YYYY h:mm A');

        if(dayjs(now).week() !== dayjs(currentDate).week()) {
            const resetGoals = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*It's a 🆕 week. Time to set 🆕 goals!*"

                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Set Weekly Goals",
                        "emoji": true
                    },
                    "value": "weekly_goal",
                    "action_id": "weekly_goal"
                }
            }
            return resetGoals
        }

        if(allWorkouts.data[0].weeklyGoals.length !== 0) {

            const { pushups, situps, squats, miles, _id } = allWorkouts.data[0].weeklyGoals[0];
            const repsComplete = allWorkouts.data[0].finishedWorkouts.filter(goals => {
                //only filter goals with pushups, situps, squats or miles

                return (dayjs().week() === dayjs(goals.date).week() && (goals.pushups || goals.squats || goals.situps || goals.miles))
            });

            //returns a total of all of the reps completed for the week that have goals
            const weeklyGoals = allWorkouts.data[0].weeklyGoals[0];

            const reps = accumulatedReps(repsComplete, weeklyGoals);

            //returns percentag of goals to reps for graph
            const percentage = graphPercentage(reps, weeklyGoals);


            const pushupSummary = goalCount(repsComplete, "pushups");
            const situpSummary = goalCount(repsComplete, "situps");
            const squatSummary = goalCount(repsComplete, "squats");
            const mileSummary = goalCount(repsComplete, "miles");

            const goalsSet = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": goalSummary("pushups", pushups, pushupSummary) + goalSummary("situps", situps, situpSummary) + goalSummary("squats", squats, squatSummary) + goalSummary("miles", miles, mileSummary),

                },
                "accessory": {
                    "type": "image",
                    "image_url": sendGraphView(percentage),
                    "alt_text": "progress bar"
                }


            }
            return goalsSet
        }

        return noGoalsSet



    },

    enterGoalReps: (allWorkouts) => {
        const noGoals = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": " *Enter weekly goals above*\nWeekly goals begin on _*Sunday*_ and reset at the end of the day on _*Saturday*_. "
            }

        };
        if(allWorkouts.data.length === 0 || allWorkouts.data[0].weeklyGoals.length === 0 || (dayjs().week() !== dayjs(allWorkouts.data[0].weeklyGoals[0].date).week())) {
            return noGoals
        }

        if(typeof allWorkouts.data[0].weeklyGoals[0] !== "undefined") {
            const { _id } = allWorkouts.data[0].weeklyGoals[0]
            const addToGoals = {

                "type": "actions",
                "elements": [{

                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "📈 Add Completed Reps 📈",
                            "emoji": true

                        },

                        "value": "add_reps_to_goal",
                        "action_id": "add_reps_to_goal"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Update Weekly Goals",
                            "emoji": true
                        },
                        "value": "update_weekly_goal",
                        "action_id": "update_weekly_goal" + _id


                    }
                ]
            };
            return addToGoals
        }

        return noGoals
    },

    stravaWorkout: (allWorkouts) => {
        try {

            const strava = allWorkouts.data[0].finishedWorkouts.filter(workout => {
                return workout.type === "Run"
            })

            if(strava[0] !== undefined) {
                const { type, distance, seconds } = strava[0];

                const lastStravaWorkout = {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Type of Exercise: " + activityType(type) + "\n" +
                            "Distance: " + getMiles(distance) + "miles / " + getKilometers(distance) + "km's\n" +
                            "Time: " + timeOfWorkout(seconds) + "\n" +
                            "Average Speed: " + avgMile(seconds, distance) + "\n"
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": allWorkouts.data[0].stravaAvatar,
                        "alt_text": "alt text for image"
                    }
                };

                return lastStravaWorkout
            }
            const noWorkout = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "No Strava workouts have been completed."
                }
            };
            return noWorkout
        } catch (err) {

            console.error(err.message);

        }
    },

    calendar: (allWorkouts) => {

        const today = dayjs().format('YYYY-MM-D');
        console.log("today", today);
        const datePicker = {
            "type": "actions",
            "block_id": "calendar",
            "elements": [{
                "type": "datepicker",

                "placeholder": {
                    "type": "plain_text",
                    "text": "Select a date",
                    "emoji": true
                },
                "action_id": "calendar",

            }]
        }
        return datePicker
    }





}





//