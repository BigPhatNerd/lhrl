const helpModal = (trigger_id, passUser) => {

    
    console.log({trigger_id})
    const help = {
        "trigger_id": trigger_id,
        "response_action": "close",
        "view": {
            "type": "modal",
            "callback_id": "help",
            "private_metadata": JSON.stringify({
            
                  "homeModal_view_id": "help",

              }),
            
            "title": {
                "type": "plain_text",
                "text": "🚨 Help 🚨",
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
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":wave: Hi " + passUser.real_name + " :wave:\n\nI hope I can help. You can use the app either from the `homepage` inside of the `Apps` section or open the app by using the `/lhrl` command.\n\nThe administrator of the channel should have created or selected a channel for the LHRL® App to post user's activity.🚨 Be sure you are in this channel 🚨. This is where you will find any of the workouts or goals that you selected to share with your community.\n\n If you are a public person, you can share your workouts with the group by selecting the :loud_sound: option. If you like to keep things private, be sure and keep the selection set to :shushing_face: each time that you submit or create a workout.",
                
            }
        },
            {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "If you would like to suggestion an 💡, report a 🐞 or just say 👋, feel free to shoot us an email."
            },
           
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                        "text": "*We will try to respond as quickly💨 as possible.*",
                        
            },
           
        },
{
    "type": "actions",
         "elements": [{
                "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "📣 Contact Us 📣",
                        "emoji": true,
                    },
                    "value": "contact",
                    "action_id": "contact",
            }
            ]
        },
         {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "If you have any questions about the functionality of the app, checkout our ❓FAQ❓ section on our site (We plan to continuously keep this updated).",
                "emoji": true,
            }
           
        },
        {
    "type": "actions",
         "elements": [{
                "type": "button",
                    "text": {
                        "type": "plain_text",
                        text: "❓ FAQs ❓",
                        "emoji": true,
                    },
                    value: "faqs",
                    url: `http://www.lhrlapp.com/support`,
                    action_id: "faqs",
            }
            ]
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "One more :bulb:, please come be a part of the most supportive and encouraging fitness community in the :earth_americas:. Join the LHRL® Community FB Page."
            }
           
        },
          {
    "type": "actions",
         "elements": [{
                "type": "button",
                    "text": {
                        "type": "plain_text",
                       text: "🔗 Join Community 🔗",
                        "emoji": true,
                    },
                   value: "community",
                    url: `https://www.facebook.com/groups/LiftHeavyRunLong`,
                    action_id: "community",
            }
            ]
        },

        
    
        
    ]
        }
    }
    return help
}

module.exports = helpModal