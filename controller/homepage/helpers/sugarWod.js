const axios = require('axios');

module.exports = {
    cfWOD: (wod) => {
        try {

            if(wod.data.data[0] !== undefined) {

                var { title, description, score_type } = wod.data.data[0].attributes;

            } else {
                return {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*CrossFit HQ Workout of the Day* \n*There is no CF WOD today. Enjoy!* 🏝\n`

                    },

                };
            }

            if(title.trim().toLowerCase().includes("rest day")) {
                const restDay = {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `\n*Title:* ${title}\n*Description:* ${description}\n*Score Type:* ${score_type}\n`

                    },

                };
                return restDay;
            }
            const workoutOfTheDay = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `\n*Title:* ${title}\n*Description:* ${description}\n*Score Type:* ${score_type}\n`

                },

                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Enter Score",
                        "emoji": true
                    },
                    "value": "cf_wod_score",
                    "action_id": "cf_wod_score"
                }
            };

            return workoutOfTheDay
        } catch (err) {

            console.error(err.message);

        }
    },
    cfHeader: () => {
        const header = {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "CrossFit HQ Workout of the Day",
                "emoji": true
            }
        };
        return header
    }
}