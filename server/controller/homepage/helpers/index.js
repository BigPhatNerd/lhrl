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
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)

module.exports = {
    currentlySubscribed: (allWorkouts) => {


        const program = (allWorkouts.data[0].selectedProgram.length === 0) ? "" : allWorkouts.data[0].selectedProgram[0].name;
        const noProgram = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":thumbsdown: You are currently not subscribed to any programs. :thumbsdown:"

            }
        };

        const hasProgram = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Currently subscribed to:* :runner: " + program + " :runner:"

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
        if(program === "") {
            return noProgram
        }

        return hasProgram
    },

    removeFromProgram: (allWorkouts) => {
        // const program = (userProgram.data[0].selectedProgram.length === 0) ? "" : userProgram.data[0].selectedProgram[0].name;
        const program = (allWorkouts.data[0].selectedProgram.length === 0) ? "" : allWorkouts.data[0].selectedProgram[0].name;
        const divider = {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "Figure out how to remove later"
            }
        };
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

        if(program === "") {
            return divider
        }

        return removeProgram

    },

    todaysWorkout: (allWorkouts) => {
        const currentDate = dayjs().format('dddd MMMM D YYYY')
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


        const noGoalsSet = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Set this weeks goals*"

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

        if(allWorkouts.data[0].weeklyGoals.length !== 0) {
            console.log("dayjs().week(): ", dayjs().week());
            const { pushups, situps, squats, miles, _id } = allWorkouts.data[0].weeklyGoals[0];
            const repsComplete = allWorkouts.data[0].finishedWorkouts.filter(goals => {
                return dayjs().week() === dayjs(goals.date).week()
            });

            //returns a total of all of the reps completed for the week that have goals
            const weeklyGoals = allWorkouts.data[0].weeklyGoals[0]
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
                    "text": "*Here is your goal summary for this week:* \n" + goalSummary("pushups", pushups, pushupSummary) + goalSummary("situps", situps, situpSummary) + goalSummary("squats", squats, squatSummary) + goalSummary("miles", miles, mileSummary),

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

        if(typeof allWorkouts.data[0].weeklyGoals[0] !== "undefined") {
            const { _id } = allWorkouts.data[0].weeklyGoals[0]
            const addToGoals = {

                "type": "actions",
                "elements": [{

                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Add Reps",
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
        const noGoals = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": " *Enter weekly goals above*\n :bangbang: Weekly goals begin on _*Sunday*_ and reset at the end of the day on _*Saturday*_. :bangbang:"
            }

        };
        return noGoals
    },



}





//