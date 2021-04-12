const {
    activityType,
    getMiles,
    getKilometers,
    timeOfWorkout,
    avgMile
} = require('../utils/strava');
const slackTemplates = {
    stravaHook(response, username, avatar) {
        // response = JSON.stringify(response);
        //response = stravaData
        console.log("response in strava-templates: ", response)
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
        array = [];

        const blockData = (username, response) => {
            const mapStrava = () =>{
                response.data.map(data =>{
                    return "Type of Exercise: " + activityType(data.type) + "\n" +
                        "Distance: " + getMiles(data.distance) + "miles / " + getKilometers(data.distance) + "km's\n" +
                        "Time: " + timeOfWorkout(data.elapsed_time) + "\n" +
                        "Average Speed: " + avgMile(data.elapsed_time, data.distance) + "\n" 
                })
            }
            array.push({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Athlete: " + username + "\n" +
                        "Type of Exercise: " + activityType(response.data[0].type) + "\n" +
                        "Distance: " + getMiles(response.data[0].distance) + "miles / " + getKilometers(response.data[0].distance) + "km's\n" +
                        "Time: " + timeOfWorkout(response.data[0].elapsed_time) + "\n" +
                        "Average Speed: " + avgMile(response.data[0].elapsed_time, response.data[0].distance) + "\n" +
                        "testing -------------- testing" + 
                        mapStrava()


                },
                "accessory": {
                    "type": "image",
                    "image_url": avatar,
                    "alt_text": "alt text for image"
                }
            }, {
                "type": "divider"
            });
            return array
        }

        const stravaReturn = {

            "text": username + " just entered a workout on Strava. ",
            "blocks": blockData(username, response)


        }
        return stravaReturn
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