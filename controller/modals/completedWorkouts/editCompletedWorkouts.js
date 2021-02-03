const editCompletedWorkout = (payload, workoutSelected, slashOrHome) => {
    const { trigger_id } = payload;
    const { _id, type, name, weight, minutes, seconds, reps, rounds, description, notes } = workoutSelected;
const metadata = JSON.parse(payload.view.private_metadata);
var { paginate } = metadata;
var paginateInteger = parseInt(paginate);

    if(workoutSelected.type === "Reps") {
        const repsModal = {
            "trigger_id": trigger_id,
            "external_id": _id,
            view: {
                "type": "modal",
                "callback_id": "edit_completed_workout",
                "private_metadata": JSON.stringify({
                    "id": _id,
                    "score_type": "Reps",
                    "homeModal_view_id": payload.view.root_view_id,
                    "home_or_slash": slashOrHome,
                    "paginate": paginateInteger
                }),
                "title": {
                    "type": "plain_text",
                    "text": "Edit Completed Workout",
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

                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "reps",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": reps.toString(),
                            "action_id": "reps"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Reps",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "notes",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": notes,
                            "multiline": true,
                            "action_id": "notes"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Notes",
                            "emoji": true
                        }
                    },


                ]
            }
        }
        return repsModal
    } else if(workoutSelected.type === "Rounds + Reps") {
        const roundRepsModal = {
            "trigger_id": trigger_id,
            "external_id": _id,
            view: {
                "type": "modal",
                "callback_id": "edit_completed_workout",
                "private_metadata": JSON.stringify({
                    "id": _id,
                    "score_type": "Rounds + Reps",
                    "homeModal_view_id": payload.view.root_view_id,
                    "home_or_slash": slashOrHome
                }),
                "title": {
                    "type": "plain_text",
                    "text": "Edit Completed Workout",
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
                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "rounds",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": rounds.toString(),
                            "action_id": "rounds"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Rounds",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "reps",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": reps.toString(),
                            "action_id": "reps"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Reps",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "notes",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": notes,
                            "multiline": true,
                            "action_id": "notes"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Notes",
                            "emoji": true
                        }
                    },


                ]
            }
        }
        return roundRepsModal
    }
    ////
    else if(workoutSelected.type === "Time") {
        const timeModal = {
            "trigger_id": trigger_id,
            "external_id": _id,
            view: {
                "type": "modal",
                "callback_id": "edit_completed_workout",
                "private_metadata": JSON.stringify({
                    "id": _id,
                    "score_type": "Time"
                }),
                "title": {
                    "type": "plain_text",
                    "text": "Edit Completed Workout",
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
                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "minutes",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": minutes.toString(),
                            "action_id": "minutes"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Minutes",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "seconds",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": seconds.toString(),
                            "action_id": "seconds"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Seconds",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "notes",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": notes,
                            "multiline": true,
                            "action_id": "notes"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Notes",
                            "emoji": true
                        }
                    },


                ]
            }
        }
        return timeModal
    }
    //
    else if(workoutSelected.type === "Load") {
        const loadModal = {
            "trigger_id": trigger_id,
            "external_id": _id,
            view: {
                "type": "modal",
                "callback_id": "edit_completed_workout",
                "private_metadata": JSON.stringify({
                    "id": _id,
                    "score_type": "Load"
                }),
                "title": {
                    "type": "plain_text",
                    "text": "Edit Completed Workout",
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
                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "weight",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": weight.toString(),
                            "action_id": "weight"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Weight",
                            "emoji": true
                        }
                    },

                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "notes",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": notes,
                            "multiline": true,
                            "action_id": "notes"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Notes",
                            "emoji": true
                        }
                    },


                ]
            }
        }
        return loadModal
    } else if(workoutSelected.type === "Distance") {
        const timeModal = {
            "trigger_id": trigger_id,
            "external_id": _id,
            view: {
                "type": "modal",
                "callback_id": "edit_completed_workout",
                "private_metadata": JSON.stringify({
                    "id": _id,
                    "score_type": "Time"
                }),
                "title": {
                    "type": "plain_text",
                    "text": "Edit Completed Workout",
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
                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "miles",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": miles.toString(),
                            "action_id": "miles"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Miles",
                            "emoji": true
                        }
                    },

                    {
                        "type": "input",
                        "optional": true,
                        "block_id": "notes",
                        "element": {
                            "type": "plain_text_input",
                            "initial_value": notes,
                            "multiline": true,
                            "action_id": "notes"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Notes",
                            "emoji": true
                        }
                    },


                ]
            }
        }
        return timeModal
    }

};



module.exports = editCompletedWorkout;





//