const welcome = (payload, slashOrHome) => {
    const { trigger_id } = payload;
    const welcomeModal = {
        "trigger_id": trigger_id,
        "view": {
            "type": "modal",
            "callback_id": "send_email",
            "private_metadata": JSON.stringify({
                "home_or_slash": slashOrHome,
                  "homeModal_view_id": payload.view.id,

              }),
            "title": {
                "type": "plain_text",
                "text": "📣 Contact Us 📣",
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
            "blocks": [
            {
                    "type": "input",
                    "optional": false,
                    "block_id": "name",
                    "element": {
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Johnny Hercules",
                            "emoji": true
                        },
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
                    "optional": false,
                    "block_id": "email",
                    "element": {
                        "placeholder": {
                            "type": "plain_text",
                            "text": "superduperstrong@sofast.com",
                            "emoji": true
                        },
                        "type": "plain_text_input",
                        "action_id": "email"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Email",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "optional": false,
                    "block_id": "subject",
                    "element": {
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Your app stinks!",
                            "emoji": true
                        },
                        "type": "plain_text_input",
                        "action_id": "subject"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Subject",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "optional": false,
                    "block_id": "message",
                    "element": {
                        "placeholder": {
                            "type": "plain_text",
                            "text": "I love y'alls podcast and...",
                            "emoji": true
                        },
                        "type": "plain_text_input",
                        "multiline": true,
                        "action_id": "message"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Message",
                        "emoji": true
                    }
                }
                

            ]
        }
    }
    return welcomeModal
}

module.exports = welcome