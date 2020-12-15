const { dateHelper } = require('./helpers');

let tenK = (start, user) => {

    return [{
            "userId": user,
            "name": "6-Weeks to 10K",
            "startDate": dateHelper(start, 0),
            "week": 1,
            "day": 1,
            "type": "intervals",
            "description": "10K stuff",
            "subscribed": true

        },
        {
            "userId": user,
            "startDate": dateHelper(start, 2),
            "week": 1,
            "day": 2,
            "type": "tempo run",
            "description": "do tempo for 10K",
            "subscribed": true
        },
        {
            "userId": user,
            "startDate": dateHelper(start, 2),
            "week": 1,
            "day": 3,
            "type": "Long Run",
            "description": "Run long for 10K",
            "subscribed": true
        }
    ]
}

module.exports = tenK;