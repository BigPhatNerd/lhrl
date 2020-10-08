const { activityType } = require('../../utils/strava');
const slackTemplates = {
    stravaHook(response, username) {
        // response = JSON.stringify(response);
        const {
            athlete,
            type,
            distance,
            elapsed_time,
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
                        "Distance: " + distance + "\n" +
                        "Elapsed Time: " + elapsed_time + "\n" +
                        "Average Speed: " + average_speed + "\n" +
                        "Max Speed: " + max_speed + "\n" +
                        "Map: " + map.summary_polyline
                }
            }]
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