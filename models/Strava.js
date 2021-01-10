var { Schema, model, Types } = require('mongoose');

var StravaSchema = new Schema({
    type: {
        type: String
    },
    event_time: {
        type: Number
    },
    object_id: {
        type: Number
    },
    object_type: {
        type: Number
    },
    owner_id: {
        type: Number
    },
    subscription_id: {
        type: Number
    },
    distance: {
        type: Number
    },
    elapsed_time: {
        type: Number
    },
    moving_time: {
        type: Number
    },
    start_date: {
        type: Date
    },
    average_temp: {
        type: Number
    },
    average_speed: {
        type: Number
    },
    max_speed: {
        type: Number
    },
    stravaMap: {
        type: String
    }

});

const Strava = model('Strava', StravaSchema);



module.exports = Strava;