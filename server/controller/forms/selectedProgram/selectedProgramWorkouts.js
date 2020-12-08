var dayjs = require("dayjs");

const selectedProgramWorkouts = async (trigger_id, workouts) => {

    const shortData = workouts.data[0].selectedProgram;
    console.log("SHORTDATA[0].name: ", shortData);

    const array = []
    const blockData = (info) => {

        const date = dayjs(info.day).format('dddd MMMM D YYYY')

        for(var i = 0; i < shortData.length; i++) {
            const date = dayjs(info[i].day).format('dddd MMMM D YYYY')

            array.push({
                type: "section",
                text: {
                    type: "plain_text",
                    text: "Workout for: " + date,
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
                            text: "Edit Workout",
                            emoji: true
                        },
                        value: "selected_program_edit",
                        action_id: "selected_program" + info[i]._id
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Delete Workout",
                            emoji: true
                        },
                        value: "selected_program_delete",
                        action_id: "selected_program_delete" + info[i]._id,

                    }
                ]
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