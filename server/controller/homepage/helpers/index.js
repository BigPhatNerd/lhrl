var dayjs = require('dayjs');
module.exports = {
    currentlySubscribed: (userProgram) => {
        console.log("userProgram.data[0].selectedProgram: ", userProgram.data[0].selectedProgram.length);
        console.log(userProgram.data[0].selectedProgram === []);

        const program = (userProgram.data[0].selectedProgram.length === 0) ? "" : userProgram.data[0].selectedProgram[0].name;
        console.log("program: ", program);
        const noProgram = {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "You are currently not subscribed to any programs.",
                "emoji": true
            }
        };

        const hasProgram = {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "Currently subscribed to: " + program,
                "emoji": true
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

    removeFromProgram: (userProgram) => {
        const program = (userProgram.data[0].selectedProgram.length === 0) ? "" : userProgram.data[0].selectedProgram[0].name;
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
                "type": "plain_text",
                "text": "Remove me from program: " + program,
                "emoji": true
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

    todaysWorkout: (userProgram) => {
        const currentDate = dayjs().format('dddd MMMM D YYYY')
        const findWorkout = userProgram.data[0].selectedProgram.filter(workout => {
            return dayjs(workout.startDate).format('dddd MMMM D YYYY') === currentDate
        });

        console.log("findWorkout: ", findWorkout);
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
                    "type": "plain_text",
                    "text": "You have already finished today's workout with a time of: " + time,
                    "emoji": true
                },
            };
            return alreadyFinishedWorkout
        }
        const { week, day, type, description, _id } = findWorkout[0];
        const workoutForToday = {

            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "Today's scheduled workout: \n Week " + week + " Day " + day + "\nType: " + type + "\nDescription: " + description,
                "emoji": true
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


    weeklyGoals: () => {
        const noGoalsSet = {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "Set this weeks goals",
                "emoji": true
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

        return noGoalsSet
    }




}





//