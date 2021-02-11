const { dateHelper } = require('./helpers');

let halfMarathon = (start, user) => {

    return [
    //Week 1
    {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 0),
            "week": 1,
            "day": 1,
            "type": "Time",
            "description": "12 X 200 Meter Intervals\n75 Seconds Rest In-Between",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 2),
            "week": 1,
            "day": 2,
            "type": "Time",
            "description": "5 X 800 Meter Intervals\n3 Minutes Rest In-Between.",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 4),
            "week": 1,
            "day": 3,
            "type": "Time",
            "description": "10K Time Trial",
            "subscribed": true
        },
        // Week 2
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 7),
            "week": 2,
            "day": 1,
            "type": "Time",
            "description": "3 x 1 mile repeats\n4 min rest in between",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 9),
            "week": 2,
            "day": 2,
            "type": "Time",
            "description": "4 x 100\n3 x 400\n4 x 100\nRest 2 min between intervals",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 11),
            "week": 2,
            "day": 3,
            "type": "Distance",
            "description": "75 min tempo run",
            "subscribed": true
        },
        //Week 3
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 14),
            "week": 3,
            "day": 1,
            "type": "Time",
            "description": "6 X 300 meters\nWalk 100  meters for recovery",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 16),
            "week": 3,
            "day": 2,
            "type": "Time",
            "description": "3 x 1K\nRest 4 min",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 18),
            "week": 3,
            "day": 3,
            "type": "Time",
            "description": "8 mile time trial",
            "subscribed": true
        },
        //Week 4
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 21),
            "week": 4,
            "day": 1,
            "type": "Time",
            "description": "20 X 100 meter runs beginning every minute on the minute (EMOM)",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 23),
            "week": 4,
            "day": 2,
            "type": "Time",
            "description": "5 X 800 Meters\n2 minute rest in-between",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 25),
            "week": 4,
            "day": 3,
            "type": "Distance",
            "description": "60 min run",
            "subscribed": true
        },
        //Week 5
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 28),
            "week": 5,
            "day": 1,
            "type": "Time",
            "description": "6 X 300 meters\nWalk 100 meters for recovery",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 30),
            "week": 5,
            "day": 2,
            "type": "Time",
            "description": "3 x 1200 meter repeats\nRest 4 min in between",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 32),
            "week": 5,
            "day": 3,
            "type": "Time",
            "description": "10 mile time trial",
            "subscribed": true
        },

        //Week 6
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 35),
            "week": 6,
            "day": 1,
            "type": "Distance",
            "description": "8 X 20 sec ‘on’ 10 sec rest\nRest 4 min and repeat",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 37),
            "week": 6,
            "day": 2,
            "type": "Distance",
            "description": "Warm up with 15 min tempo run\n12 min at max effort ",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 39),
            "week": 6,
            "day": 3,
            "type": "Distance",
            "description": "60 min run",
            "subscribed": true
        },

        //Week 7
          {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 42),
            "week": 7,
            "day": 1,
            "type": "Time",
            "description": "4 X 500 meters\nRest 4 min",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 44),
            "week": 7,
            "day": 2,
            "type": "Time",
            "description": "5 X 1K repeats\n2 min rest",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 46),
            "week": 7,
            "day": 3,
            "type": "Time",
            "description": "13.1 mile time trila",
            "subscribed": true
        },
        // Week 8
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 49),
            "week": 8,
            "day": 1,
            "type": "Time",
            "description": "8 x 200 meters\nRest 60 sec between intervals",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 51),
            "week": 8,
            "day": 2,
            "type": "Time",
            "description": "track ladder: 1 x 1K, 1 x 800, 1 x 400, 1 x 200, 1 x 100, 1 x 100, 1 x 200, 1 x 400, 1 x 800, 1 x 1K\nRest 90 seconds between intervals",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 53),
            "week": 8,
            "day": 3,
            "type": "Time",
            "description": "10K tempo",
            "subscribed": true
        },
        //Week 9
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 56),
            "week": 9,
            "day": 1,
            "type": "Time",
            "description": "20 X 100 EMOM\n(every minute on the minute)",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 58),
            "week": 9,
            "day": 2,
            "type": "Time",
            "description": "2 X 2 mile repeats\nRest 7 min",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 60),
            "week": 9,
            "day": 3,
            "type": "Time",
            "description": "8 mile time trial",
            "subscribed": true
        },
        //Week 10
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 63),
            "week": 10,
            "day": 1,
            "type": "Distance",
            "description": "5 X 60 sec on 30 sec rest\nThen 10 X 30 on 30 rest",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 65),
            "week": 10,
            "day": 2,
            "type": "Time",
            "description": "3K\nRest 3 min\n2K\nRest 3 min\n1K",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
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
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 70),
            "week":11,
            "day": 1,
            "type": "Time",
            "description": "4 X 200 meters\n2 X 400 meters\n4 X 200meters\nRest the length of time it takes to run the interval.",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 72),
            "week":11,
            "day": 2,
            "type": "Time",
            "description": "5 x 800 meters\Rest 5 minutes in between",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 74),
            "week":11,
            "day": 3,
            "type": "Distance",
            "description": "60 min run",
            "subscribed": true
        },

        //Week 12
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 77),
            "week": 12,
            "day": 1,
            "type": "Time",
            "description": "RACE WEEK!!\n 8 X 200 at 70% effort\nRest 2 minutes",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 79),
            "week": 12,
            "day": 2,
            "type": "Distance",
            "description": "RACE WEEK!!\nEasy 30 minute run",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "12-weeks to half-marathon",
            "startDate": dateHelper(start, 81),
            "week": 12,
            "day": 3,
            "type": "Time",
            "description": "13.1! Go for it!",
            "subscribed": true
        },
    ]
}

module.exports = halfMarathon;