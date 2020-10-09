const {
    activityType,
    getMiles,
    getKilometers
} = require('../utils/strava');
const slackTemplates = {
    stravaHook(response, username, avatar) {
        // response = JSON.stringify(response);
        const {
            athlete,
            type,
            distance,
            elapsed_time,
            moving_time,
            average_speed,
            max_speed,
            map
        } = response;
        return {
            "blocks": [{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": " Athlete: " + username + "\n" +
                            "Type of Exercise: " + activityType(type) + "\n" +
                            "Distance: " + getMiles(distance) + "miles. " + getKilometers(distance) + "km's\n" +
                            "Elapsed Time: " + elapsed_time + "\n" +
                            "Moving Time: " + moving_time + "\n" +
                            "Average Speed: " + average_speed + "\n" +
                            "Max Speed: " + max_speed + ""

                    },
                    "accessory": {
                        "type": "image",
                        "image_url": avatar,
                        "alt_text": "alt text for image"
                    }
                },
                {
                    "type": "divider"
                }
            ]

        }
    },
    testSlackBlock(argument) {

        return {
            "blocks": [{
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "This is a " + argument + " section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>"
                }
            }]
        }
    }

}


module.exports = slackTemplates;