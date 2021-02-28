const confirmRemove = async (payload, slashOrHome) => {
    const { trigger_id } = payload;

    const view = {

        "trigger_id": trigger_id,

        view: {
            "type": "modal",
            "callback_id": "confirm_remove",
            "private_metadata": JSON.stringify({

                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.id
            }),

            "title": {
                "type": "plain_text",
                "text": "Remove from plan",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Remove from plan",
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
                    "type": "plain_text",
                    "text": "Are you sure that you want to remove this plan?",
                    "emoji": true
                }
            }]
        }
    }

    return view
}

module.exports = confirmRemove;