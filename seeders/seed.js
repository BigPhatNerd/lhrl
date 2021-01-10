let mongoose = require('mongoose');
let db = require('../models');
const { dateHelper } = require('./helpers');
const connectDB = require('../config/db.js');

let fiveK_seed = [{
        "name": "6-Weeks to 5K",
        // "startDate": dateHelper(start, 0),
        "week": 1,
        "day": 1,
        "type": "intervals",
        "description": "run around and do a bunch of stuff",
        "subscribed": true

    },
    {
        // "startDate": dateHelper(start, 2),
        "week": 1,
        "day": 2,
        "type": "tempo run",
        "description": "do tempo running",
        "subscribed": true
    },
    {
        // "startDate": dateHelper(start, 4),
        "week": 1,
        "day": 3,
        "type": "Long Run",
        "description": "Run long",
        "subscribed": true
    }
];

connectDB();

db.FiveK.deleteMany({})
    .then(() => db.FiveK.collection.insertMany(fiveK_seed))
    .then(data => {
        console.log(data.result.n + ' records inserted!');
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

let tenK_seed = [{
        "name": "6-Weeks to 10K",
        // "startDate": dateHelper(start, 0),
        "week": 1,
        "day": 1,
        "type": "intervals",
        "description": "10K stuff",
        "subscribed": true

    },
    {
        // "startDate": dateHelper(start, 2),
        "week": 1,
        "day": 2,
        "type": "tempo run",
        "description": "do tempo for 10K",
        "subscribed": true
    },
    {
        // "startDate": dateHelper(start, 2),
        "week": 1,
        "day": 3,
        "type": "Long Run",
        "description": "Run long for 10K",
        "subscribed": true
    }
];


db.TenK.deleteMany({})
    .then(() => db.TenK.collection.insertMany(tenK_seed))
    .then(data => {
        console.log(data.result.n + ' records inserted!');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });