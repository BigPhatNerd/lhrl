const { dateHelper } = require('./helpers');

let tenK = (start, user) => {

    return [{
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 0),
            "week": 1,
            "day": 1,
            "type": "Time",
            "description": "10K stuff",
            "subscribed": true

        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 2),
            "week": 1,
            "day": 2,
            "type": "Time",
            "description": "do tempo for 10K",
            "subscribed": true
        },
        {
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 2),
            "week": 1,
            "day": 3,
            "type": "Time",
            "description": "Run long for 10K",
            "subscribed": true
        }
    ]
}

module.exports = tenK;