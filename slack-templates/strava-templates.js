var dayjs = require("dayjs");
console.log(
  dayjs(new Date("Sat, 14 Aug 2021 13:37:32 GMT")).format("dddd MMMM D YYYY")
);
const {
  activityType,
  getMiles,
  getKilometers,
  timeOfWorkout,
  avgMile,
} = require("../utils/strava");
const slackTemplates = {
  stravaHook(response, username, avatar, channel) {
    // response = JSON.stringify(response);
    const {
      athlete,
      type,
      distance,
      elapsed_time,
      moving_time,
      average_speed,
      max_speed,
      map,
      start_date
    } = response;
    array = [];
  
    const date = dayjs(start_date).format("dddd MMMM D YYYY");

    const blockData = (
      date,
      username,
      distance,
      elapsed_time,
      moving_time,
      average_speed,
      max_speed
    ) => {
      array.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "Athlete: " +
              username +
              "\n" +
              "Date: " +
              date +
              "\n" +
              "Type of Exercise: " +
              activityType(type) +
              "\n" +
              "Distance: " +
              getMiles(distance) +
              "miles / " +
              getKilometers(distance) +
              "km's\n" +
              "Time: " +
              timeOfWorkout(elapsed_time) +
              "\n" +
              "Average Speed: " +
              avgMile(elapsed_time, distance) +
              "\n",
          },
          accessory: {
            type: "image",
            image_url: avatar,
            alt_text: "alt text for image",
          },
        },
        {
          type: "divider",
        }
      );
      return array;
    };

    const stravaReturn = {
      channel: channel,
      text: username + " just entered a workout on Strava. ",
      blocks: blockData(
        date,
        username,
        distance,
        elapsed_time,
        moving_time,
        average_speed,
        max_speed
      ),
    };
    return stravaReturn;
  },
  testSlackBlock(argument) {
    return {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "This is a " +
              argument +
              " section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>",
          },
        },
      ],
    };
  },
};

module.exports = slackTemplates;
