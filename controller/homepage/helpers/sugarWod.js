const axios = require('axios');

module.exports = {
    cfWOD: (wod) => {
        try {
           
                var { title, description, type, _id } = wod;
            const workoutOfTheDay = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `\n*Title:* ${title}\n*Description:* ${description}\n*Score Type:* ${type}\n`

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
                "text": "CF Workout of the Day",
                "emoji": true
            }
        };
        return header
    }
}