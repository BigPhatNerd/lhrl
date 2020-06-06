var mongoose = require('mongoose');
var schema = mongoose.Schema;
var module = require('module');

var UserSchema = new schema({
    provider: { type: String, default: '' },
    id: { type: String },
    garminRequestToken: { type: String, default: '' },
    displayName: { type: String, default: '' },
    name: {},

    emails: {
        value: { type: String, default: '' },
        type: { type: String, default: '' }
    },

    photos: {},
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    oauthtoken: { type: String }

});



module.exports = mongoose.model('User', UserSchema, 'auth');