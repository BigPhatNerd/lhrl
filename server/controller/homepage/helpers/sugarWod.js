const axios = require('axios');

module.exports = {
    cfWOD: (wod) => {
        try {

            const { title, description, score_type } = wod.data.data[0].attributes;
            console.log("\n\n\n\ntitle: ", title);

            if(title.trim().toLowerCase().includes("rest day")) {
     const restDay = {
         "type": "section",
         "text": {
             "type": "mrkdwn",
             "text": `*CrossFit HQ Workout of the Day* \n*Title:* ${title}\n*Description:* ${description}\n*Score Type:* ${score_type}\n`

         },

     };
     return restDay;
 }
            const workoutOfTheDay = {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*CrossFit HQ Workout of the Day* \n*Title:* ${title}\n*Description:* ${description}\n*Score Type:* ${score_type}\n`

                },

                // "accessory": {
    //     "type": "button",
    //     "text": {
    //         "type": "plain_text",
    //         "text": "Enter Score",
    //         "emoji": true
    //     },
    //     "value": "cf_wod_score",
    //     "action_id": "cf_wod_score"
    // }
            };

            return workoutOfTheDay
        } catch (err) {

            console.error(err.message);

        }
    }
}