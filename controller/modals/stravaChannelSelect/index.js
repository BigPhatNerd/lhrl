const {url} = require('../../../lib/keys.js')
const stravaConfirm = async (payload, slashOrHome, publicChannels) => {
    const urlString = process.env.NODE_ENV === "production" ? url.production : url.development
    const channelOptions = publicChannels.map(channel =>{
        return {
                                "text": {
                                    "type": "plain_text",
                                    "text": channel,
                                    "emoji": true
                                },
                                "value": channel,
                            }
    })

const staticSelect = {
                    "type": "section",
                    "block_id": "type",
                    "text": {
                        "type": "plain_text",
                        "text": "Do you wish to keep Strava workouts private 🤫 or post to a Slack channel 🔊",
                        "emoji": true
                    },
                    "accessory": {
                        "type": "static_select",

                        "placeholder": {
                            "type": "plain_text",
                            "text": "Keep private 🤫" ,

                            "emoji": true
                        },
                        "options": channelOptions,
                        "action_id": "public_private"
                    }
                }

    const { trigger_id } = payload;

    const view = {

        "trigger_id": trigger_id,

        view: {
            "type": "modal",
            "callback_id": "strava_channel_select",
            "private_metadata": JSON.stringify({

                "home_or_slash": slashOrHome,
                "homeModal_view_id": payload.view.id
            }),

            "title": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Strava Workouts",
                
                "emoji": true,

            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [
            staticSelect
            ]
        }
    }

    return view
}

module.exports = stravaConfirm;