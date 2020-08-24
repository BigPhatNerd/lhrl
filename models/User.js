var { Schema, model } = require('mongoose');

var module = require('module');

var UserSchema = new Schema({
    provider: {
        type: String,
        default: ''
    },
    twitterId: {
        type: String
    },
    stravaId: {
        type: String
    },
    garminRequestToken: {
        type: String,
        default: ''
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
    emails: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        }
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
    garminAuthToken: {
        type: String
    }

}, {
    toJSON: {
        getters: true
    }
});

const User = model('User', UserSchema, 'auth');

module.exports = User;