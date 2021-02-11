const editWorkout = (payload, workoutSelected, slashOrHome) => {
    const { trigger_id } = payload;

    const { _id, type, name, description } = workoutSelected;

    const metadata = JSON.parse(payload.view.private_metadata)

var { view_paginate } = metadata;
var paginateInteger = parseInt(view_paginate);

    const editModal = {
        "trigger_id": trigger_id,
        "external_id": _id,
        view: {
            "type": "modal",
            "callback_id": "edit_created_workout",
            "private_metadata": JSON.stringify({
                "id": _id,
                "score_type": type,
                "homeModal_view_id": payload.view.root_view_id,
                "home_or_slash": slashOrHome,
                "view_paginate": paginateInteger

            }),
            "title": {
                "type": "plain_text",
                "text": "Edit Workout",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Close",
                "emoji": true
            },
            "blocks": [{
                    "type": "section",
                    "block_id": "type",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Edit Type:"
                    },
                    "accessory": {
                        "type": "static_select",

                        "placeholder": {
                            "type": "plain_text",
                            "text": type,

                            "emoji": true
                        },
                        "options": [{
                                "text": {
                                    "type": "plain_text",
                                    "text": "Reps",
                                    "emoji": true
                                },
                                "value": "Reps",
                            }, {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Rounds + Reps",
                                    "emoji": true
                                },
                                "value": "Rounds + Reps",
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Time",
                                    "emoji": true
                                },
                                "value": "Time"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Load",
                                    "emoji": true
                                },
                                "value": "Load"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Distance",
                                    "emoji": true
                                },
                                "value": "Distance"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Meters",
                                    "emoji": true
                                },
                                "value": "Meters"
                            },


                        ],
                        "action_id": "edit"
                    }
                },
                {

                    "type": "input",
                    "block_id": "name",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": name,
                        "action_id": "name"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Name",
                        "emoji": true
                    }
                },

                {
                    "type": "input",
                    "optional": true,
                    "block_id": "description",
                    "element": {
                        "type": "plain_text_input",
                        "initial_value": description,
                        "multiline": true,
                        "action_id": "description"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Description",
                        "emoji": true
                    }
                },

            ]
        }
    }
    return editModal



    ////////////////


};



module.exports = editWorkout;





//