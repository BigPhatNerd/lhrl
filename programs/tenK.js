const { dateHelper } = require('./helpers');

let tenK = (start, user) => {

    return [//Week 1
    {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 0),
            "week": 1,
            "day": 1,
            "type": "Time",
            "description": "8 X 200 meter run with 2 minute rest",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 2),
            "week": 1,
            "day": 2,
            "type": "Distance",
            "description": "6 X 3 minute intervals with 4 minutes rest.",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
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
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 7),
            "week": 2,
            "day": 1,
            "type": "Time",
            "description": "6 x 400 meter run starting every 3 minutes",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 9),
            "week": 2,
            "day": 2,
            "type": "Distance",
            "description": "4 X 800 meter run, rest 4 min\n5 X 20 Seconds on X 40 Seconds recovery run",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 11),
            "week": 2,
            "day": 3,
            "type": "Distance",
            "description": "45 min tempo run.",
            "subscribed": true
        },
        //Week 3
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 14),
            "week": 3,
            "day": 1,
            "type": "Time",
            "description": "4 X 300 meters\n6 X 200 meters\n8 X 100 meters\nRecovery walk the length of the interval",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 16),
            "week": 3,
            "day": 2,
            "type": "Distance",
            "description": "12 min time Trial",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 18),
            "week": 3,
            "day": 3,
            "type": "Time",
            "description": "5K run\nRest 10minutes\nRepeat\n**Goal is to be faster on the second run**",
            "subscribed": true
        },
        //Week 4
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 21),
            "week": 4,
            "day": 1,
            "type": "Time",
            "description": "20 X 100 meter runs beginning every minute on the minute (EMOM)",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 23),
            "week": 4,
            "day": 2,
            "type": "Time",
            "description": "3 X 1K runs.\nRest 4 minutes in between",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 25),
            "week": 4,
            "day": 3,
            "type": "Distance",
            "description": "75 minute run @ 80% or higher effort. Record distance",
            "subscribed": true
        },
        //Week 5
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 28),
            "week": 5,
            "day": 1,
            "type": "Time",
            "description": "4 X 400 meters\n3 X 600 meters\nRest 2 minutes in between",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 30),
            "week": 5,
            "day": 2,
            "type": "Time",
            "description": "4 X 1 mile runs\nRest 4 minutes",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 32),
            "week": 5,
            "day": 3,
            "type": "Time",
            "description": "4 mile tempo run.",
            "subscribed": true
        },

        //Week 6
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 35),
            "week": 6,
            "day": 1,
            "type": "Time",
            "description": "RACE WEEK!!\n 8 X 200 meter runs at easy pace\nRest twice the time it takes to complete the interval",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 37),
            "week": 6,
            "day": 2,
            "type": "Distance",
            "description": "RACE WEEK!!\nTempo run for 40 minutes.",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 39),
            "week": 6,
            "day": 3,
            "type": "Time",
            "description": "10K! Go for it!",
            "subscribed": true
        }
    ]
}

module.exports = tenK;