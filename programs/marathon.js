const { dateHelper } = require('./helpers');

let marathon = (start, user) => {

    return [
    //Week 1
    {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 0),
            "week": 1,
            "day": 1,
            "type": "Time",
            "description": "8 X 200 Meter Intervals\n2 minutes Rest In-Between",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 2),
            "week": 1,
            "day": 2,
            "type": "Time",
            "description": "5 X 800 Meter Intervals\n3 Minutes Rest In-Between.",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 4),
            "week": 1,
            "day": 3,
            "type": "Time",
            "description": "75 min tempo run",
            "subscribed": true
        },
        // Week 2
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 7),
            "week": 2,
            "day": 1,
            "type": "Time",
            "description": "3 x 1 mile repeats\n4 min rest in between",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 9),
            "week": 2,
            "day": 2,
            "type": "Time",
            "description": "2 x 400\n4 x 100\nRepeat\nRest 4 min in between",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 11),
            "week": 2,
            "day": 3,
            "type": "Time",
            "description": "10K time trial",
            "subscribed": true
        },
        //Week 3
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 14),
            "week": 3,
            "day": 1,
            "type": "Time",
            "description": "6 X 300 meters\nRest 90 seconds",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 16),
            "week": 3,
            "day": 2,
            "type": "Time",
            "description": "4 x 1K\nRest 4 min",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 18),
            "week": 3,
            "day": 3,
            "type": "Distance",
            "description": "75 min tempo run",
            "subscribed": true
        },
        //Week 4
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 21),
            "week": 4,
            "day": 1,
            "type": "Time",
            "description": "6 X 400 meter\nRest 2 minutes",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 23),
            "week": 4,
            "day": 2,
            "type": "Time",
            "description": "10 X 800 Meters\n2 minute rest in-between",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 25),
            "week": 4,
            "day": 3,
            "type": "Distance",
            "description": "8 mile time trial",
            "subscribed": true
        },
        //Week 5
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 28),
            "week": 5,
            "day": 1,
            "type": "Time",
            "description": "20 X 200 meters starting every minute on the minute\n(EMOM)",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 30),
            "week": 5,
            "day": 2,
            "type": "Time",
            "description": "4 x 1200 meter repeats\nRest 3 min in between",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 32),
            "week": 5,
            "day": 3,
            "type": "Distance",
            "description": "90 min tempo run",
            "subscribed": true
        },

        //Week 6
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 35),
            "week": 6,
            "day": 1,
            "type": "Time",
            "description": "6 x 400\nRest the amount of time as the interval.",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 37),
            "week": 6,
            "day": 2,
            "type": "Distance",
            "description": "30 min tempo run",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 39),
            "week": 6,
            "day": 3,
            "type": "Distance",
            "description": "2.5 hour run",
            "subscribed": true
        },

        //Week 7
          {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 42),
            "week": 7,
            "day": 1,
            "type": "Distance",
            "description": "Tabata: 8 X 20seconds on/ 10seconds off\nRest 4 min\nRepeat",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 44),
            "week": 7,
            "day": 2,
            "type": "Time",
            "description": "5 X 1K repeats\n4 min rest",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 46),
            "week": 7,
            "day": 3,
            "type": "Time",
            "description": "10 mile time trial",
            "subscribed": true
        },
        // Week 8
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 49),
            "week": 8,
            "day": 1,
            "type": "Time",
            "description": "12 x 200 meters\nRest 60 sec between intervals",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 51),
            "week": 8,
            "day": 2,
            "type": "Time",
            "description": "track ladder: 1 x 1K, 1 x 800, 1 x 400, 1 x 200, 1 x 100, 1 x 100, 1 x 200, 1 x 400, 1 x 800, 1 x 1K\nRest 90 seconds between intervals",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 53),
            "week": 8,
            "day": 3,
            "type": "Time",
            "description": "13.1K slightly faster than marathon pace.",
            "subscribed": true
        },
        //Week 9
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 56),
            "week": 9,
            "day": 1,
            "type": "Time",
            "description": "6 X 400\nRest 3 min",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 58),
            "week": 9,
            "day": 2,
            "type": "Time",
            "description": "2 X 2 mile repeats\nRest 7 min",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 60),
            "week": 9,
            "day": 3,
            "type": "Time",
            "description": "10K time trial",
            "subscribed": true
        },
        //Week 10
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 63),
            "week": 10,
            "day": 1,
            "type": "Distance",
            "description": "2 min max effort / w min 70% effort\n5 rounds",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 65),
            "week": 10,
            "day": 2,
            "type": "Time",
            "description": "3K\nRest 4 min\n2K\nRest 3 min\n1K\n Rest 2 min\n800 meter\n",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 67),
            "week": 10,
            "day": 3,
            "type": "Time",
            "description": "10 mile tempo run",
            "subscribed": true
        },
        //Week 11
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 70),
            "week":11,
            "day": 1,
            "type": "Time",
            "description": "4 X 200 meters\n2 X 400 meters\n4 X 200meters\nRest the length of time it takes to run the interval.",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 72),
            "week":11,
            "day": 2,
            "type": "Time",
            "description": "5 x 800 meters\Rest 5 minutes in between",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 74),
            "week":11,
            "day": 3,
            "type": "Distance",
            "description": "90 min run",
            "subscribed": true
        },

        //Week 12
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 77),
            "week": 12,
            "day": 1,
            "type": "Time",
            "description": "RACE WEEK!!\n 8 X 200 at 70% effort\nRest 2 minutes",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 79),
            "week": 12,
            "day": 2,
            "type": "Time",
            "description": "RACE WEEK!!\nEasy 6 mile run",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to marathon",
            "startDate": dateHelper(start, 81),
            "week": 12,
            "day": 3,
            "type": "Time",
            "description": "26.2! Go for it!",
            "subscribed": true
        },
    ]
}

module.exports = marathon;