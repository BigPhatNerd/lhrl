var dayjs = require("dayjs");


const selectedProgramWorkouts = async (trigger_id, workouts) => {

    const shortData = workouts.data[0].selectedProgram;



    const array = []
    const blockData = (info) => {
        for(var i = 0; i < shortData.length; i++) {

            const slicedDate = info[i].startDate.slice(0, -14);
            const date = dayjs(slicedDate).format('dddd MMMM D YYYY');
            const completed = () => {
                if(info[i].completed) {
                    if(info[i].type === "Time") {
                        return "You completed this workout on " + dayjs(info[i].dateCompleted).format('dddd MMMM D YYYY') + " \nin " + info[i].minutes + " minutes " + info[i].seconds + " seconds!"
                    } else if(info[i].type === "Distance") {
                        return "You completed this workout on " + dayjs(info[i].dateCompleted).format('dddd MMMM D YYYY') + ". \n You ran " + info[i].miles + " miles!"
                    }
                }
                return "Workout for: " + date
            };
            const enterNewTime = () => {
                if(info[i].completed) {
                    return "Update Score"
                }
                return "Enter Score"

            }

            array.push({
                type: "section",
                text: {
                    type: "plain_text",
                    text: completed(),
                    emoji: true
                },


            }, {
                type: "section",
                text: {
                    type: "plain_text",
                    text: "Week " + info[i].week + " Day " + info[i].day,
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
                    text: "Descripton: " + info[i].description,
                    emoji: true
                },

            }, {
                type: "actions",
                elements: [{
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: enterNewTime(),
                        emoji: true
                    },
                    value: "selected_program_score",
                    action_id: "selected_program_score" + info[i]._id,

                }]
            }, {
                type: "divider"
            })


        }
        return array;
    }




    const mapWorkouts = {
        "trigger_id": trigger_id,
        view: {
            "type": "modal",
            "callback_id": "selected_program_workouts",

            "title": {
                "type": "plain_text",
                "text": shortData[0].name,
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

module.exports = selectedProgramWorkouts;