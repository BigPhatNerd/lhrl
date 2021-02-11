const { dateHelper } = require('./helpers');

let fiveK = (start, user) => {

    return [
//Week 1
    {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 0),
            "week": 1,
            "day": 1,
            "type": "Time",
            "description": "8 X 200 meter run with 2 minute rest",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 2),
            "week": 1,
            "day": 2,
            "type": "Time",
            "description": "3 X 800 meter run with 4 minute rest",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 4),
            "week": 1,
            "day": 3,
            "type": "Time",
            "description": "5K Time Trial",
            "subscribed": true
        },
        // Week 2
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 7),
            "week": 2,
            "day": 1,
            "type": "Time",
            "description": "6 x 400 meter run starting every 3 minutes",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 9),
            "week": 2,
            "day": 2,
            "type": "Time",
            "description": "2 X 1 mile runs with 5 minute rest.",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 11),
            "week": 2,
            "day": 3,
            "type": "Distance",
            "description": "30 min tempo run.",
            "subscribed": true
        },
        //Week 3
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 14),
            "week": 3,
            "day": 1,
            "type": "Time",
            "description": "20 X 100 meter runs beginning every minute on the minute (EMOM)",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 16),
            "week": 3,
            "day": 2,
            "type": "Time",
            "description": "2 kilometer run. \nRest 5 min.\n1 kilometer run. \nRepeat.",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 18),
            "week": 3,
            "day": 3,
            "type": "Distance",
            "description": "Run 20 min at warm up pace, then run 20 min Time Trial:\n record distance.\nCool down 5-10 min",
            "subscribed": true
        },
        //Week 4
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 21),
            "week": 4,
            "day": 1,
            "type": "Time",
            "description": "7 X 300 meter runs with 100 meter recovery runs or walks in between.",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 23),
            "week": 4,
            "day": 2,
            "type": "Time",
            "description": "5 X 800 meter runs starting every 5 minutes",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 25),
            "week": 4,
            "day": 3,
            "type": "Distance",
            "description": "Tempo run for 40 minutes. \nFinish with the last mile at or near 5K goal race pace.",
            "subscribed": true
        },
        //Week 5
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 28),
            "week": 5,
            "day": 1,
            "type": "Time",
            "description": "RACE WEEK!!\n 20 minute tempo run\n 6 X 200 meter runs with 60 second recovery",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 30),
            "week": 5,
            "day": 2,
            "type": "Distance",
            "description": "RACE WEEK!!\nTempo run for 40 minutes.",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "5-Weeks to 5K",
            "startDate": dateHelper(start, 32),
            "week": 5,
            "day": 3,
            "type": "Time",
            "description": "5K! Go for it!",
            "subscribed": true
        }
    ]
}

module.exports = fiveK;