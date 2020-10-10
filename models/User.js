var { Schema, model } = require('mongoose');
passportLocalMongoose = require('passport-local-mongoose')

var moment = require('moment');

var UserSchema = new Schema({
    provider: {
        type: String,
        default: ''
    },

    stravaId: {
        type: String,
        unique: true
    },

    displayName: {
        type: String,
        default: ''
    },
    name: {
        type: String
    },
    stravaAvatar: {
        type: String
    },
    email: {
        type: String,
        allowNull: false,
        unique: true,

    },
    // The password cannot be null
    password: {
        type: String,
        allowNull: false
    },

    photos: {},
    created: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
    },
    modified: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    stravaAccessToken: {
        type: String
    },
    stravaRefreshToken: {
        type: String
    },
    expires_at: {
        type: Number

    },
    expires_in: {
        type: Number
    },
    accepted_scopes: {
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


}, {
    toJSON: {
        getters: true
    }
});



// const User = model('User', UserSchema, 'auth');
const User = model('User', UserSchema);


module.exports = User;