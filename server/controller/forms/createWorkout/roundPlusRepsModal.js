const roundsPlusRepsModal = (trigger_id) => {
    const roundsPlusReps = {
        "trigger_id": trigger_id,
 view: {
     "type": "modal",
     "callback_id": "create_workout",
     "private_metadata": JSON.stringify({
         "score_type": "Rounds + Reps",
     }),
     "title": {
         "type": "plain_text",
         "text": "Create Rounds + Reps",
         "emoji": true
     },
     "submit": {
         "type": "plain_text",
         "text": "Submit",
         "emoji": true
     },
     "close": {
         "type": "plain_text",
         "text": "Cancel",
         "emoji": true
     },
     "blocks": [{
             "type": "input",
             "block_id": "name",
             "element": {
                 "type": "plain_text_input",
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
    return roundsPlusReps
}

module.exports = roundsPlusRepsModal;