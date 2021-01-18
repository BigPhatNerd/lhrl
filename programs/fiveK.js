const { dateHelper } = require('./helpers');

let fiveK = (start, user) => {

    return [{
            "userId": user,
            "name": "6-Weeks to 5K",
            "startDate": dateHelper(start, 0),
            "week": 1,
            "day": 1,
            "type": "Time",
            "description": "run around and do a bunch of sturff",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "6-Weeks to 5K",
            "startDate": dateHelper(start, 2),
            "week": 1,
            "day": 2,
            "type": "Distance",
            "description": "do tempo running",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "6-Weeks to 5K",
            "startDate": dateHelper(start, 4),
            "week": 1,
            "day": 3,
            "type": "Distance",
            "description": "Run long",
            "subscribed": true
        }
    ]
}

module.exports = fiveK;