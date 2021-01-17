var dayjs = require("dayjs");

const viewWorkouts = async (payload, workouts, slashOrHome) => {
    const { trigger_id } = payload;

    var shortData;
    if(workouts.data.length === 0) {
        shortData = [];
    } else {
        shortData = workouts.data[0].workouts;
    }
    // const shortData = workouts.data[0].workouts;
    const array = []
    const blockData = (info) => {

        const date = dayjs(info.day).format('dddd MMMM D YYYY')
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

            const date = dayjs(info[i].day).format('dddd MMMM D YYYY')
            ///Beginning to test different workout types below:
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
                type: "actions",
                elements: [{
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Complete Workout",
                            emoji: true
                        },
                        value: "complete_created_workouts",
                        action_id: "complete" + info[i]._id
                    }, {
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

            ///^^^ Testing workout type

        }
        return array;
    }




    const mapWorkouts = {
        "trigger_id": trigger_id,
        "response_action": "clear",
        view: {
            "type": "modal",
            "callback_id": "view_workouts",
             "private_metadata": JSON.stringify({
                "home_or_slash": slashOrHome,
                  "homeModal_view_id": payload.view.id,

              }),
                   
            "title": {
                "type": "plain_text",
                "text": "Workouts Created: ",
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
            "blocks": (blockData(shortData))



        }
    }
    return mapWorkouts
}

module.exports = viewWorkouts;