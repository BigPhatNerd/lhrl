

const sendToStrava = async (payload, slashOrHome, urlString) => {
   console.log({payload})
    const { trigger_id } = payload;

    const view = {

        "trigger_id": trigger_id,
        // "response_action": "push",
        "view_id": payload.view.id,


        view: {
            "type": "modal",
            "callback_id": "send_to_strava",
            "private_metadata": JSON.stringify({

                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.id
            }),

            "title": {
                "type": "plain_text",
                "text": "Authorize Strava",
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
            "blocks": [{
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "This is a section block with a button."
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Click Me",
                    "emoji": true
                },
                "value": "send_to_strava",
                "url": `${urlString}/strava/login`,
                "action_id": "button-action"
            }
        }
            ]
        }
    }

    return view
}

module.exports = sendToStrava;