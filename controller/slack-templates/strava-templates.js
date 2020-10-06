const slackTemplates = {
    stravaHook(response) {
        response = JSON.stringify(response);
        const {
            athlete,
            type,
            distance,
            elapsed_time,
            average_speed,
            max_speed
        } = response;
        return {
            "blocks": [{
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": " Athlete id: " + athlete.id + "\n" +
                        "Type of Exercise: " + type + "\n" +
                        "Distance: " + distance + "\n" +
                        "Elapsed Time: " + elapsed_time + "\n" +
                        "Average Speed: " + average_speed + "\n" +
                        "Max Speed: " + max_speed
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