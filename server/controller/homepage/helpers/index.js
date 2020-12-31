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
var weekOfYear = require('dayjs/plugin/weekOfYear');
dayjs.extend(weekOfYear)
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


module.exports = {
    currentlySubscribed: (allWorkouts) => {



        if(allWorkouts.data.length === 0 || allWorkouts.data[0].selectedProgram.length === 0) {
            const noProgram = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": ":thumbsdown: You are currently not subscribed to any programs. :thumbsdown:"

                }
            };
            return noProgram
        }

        const program = allWorkouts.data[0].selectedProgram[0].name;
        const hasProgram = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Currently subscribed to:* :woman-running: " + program + " :runner:"

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
                    "text": "Remove Plan",
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
                    "text": "You are not following a specific program.",
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
            const { time } = findWorkout[0];
            const alreadyFinishedWorkout = {

                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*You have already finished today's workout with a time of:* " + time + " :beach_with_umbrella: "

                },
            };
            return alreadyFinishedWorkout
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
                "text": "😢 *You currently have no goals set* 😢"

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
                "text": " *Enter weekly goals above*\n :bangbang: Weekly goals begin on _*Sunday*_ and reset at the end of the day on _*Saturday*_. :bangbang:"
            }

        };
        if(allWorkouts.data.length === 0 || allWorkouts.data[0].weeklyGoals.length === 0) {
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
                            "text": "Add Completed Reps",
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





}





//