const { dateHelper } = require('./helpers');

let program = (start) => {

    return [{
            "startDate": dateHelper(start, 0),
            "week": 1,
            "day": 1,
            "type": "intervals",
            "description": "10K stuff",
            "subscribed": true

        },
        {
            "startDate": dateHelper(start, 2),
            "week": 1,
            "day": 2,
            "type": "tempo run",
            "description": "do tempo for 10K",
            "subscribed": true
        },
        {
            "startDate": dateHelper(start, 2),
            "week": 1,
            "day": 3,
            "type": "Long Run",
            "description": "Run long for 10K",
            "subscribed": true
        }
    ]
}

module.exports = program;