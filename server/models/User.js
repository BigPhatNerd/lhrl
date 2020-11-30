var { Schema, model, Types } = require('mongoose');
var bcrypt = require('bcrypt');

var dayjs = require("dayjs");

var UserSchema = new Schema({
    provider: {
        type: String,
        default: ''
    },

    stravaId: {
        type: String,

    },
    isAuthenticated: {
        type: Boolean,
        default: false
    },
    authorizeStrava: {
        type: Boolean,
        default: false
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
    username: {
        type: String,
        allowNull: false,
        unique: true,

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
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: "Workout"
    }],
    stravaWorkouts: [{
        type: Schema.Types.ObjectId,
        ref: "Strava"
    }],
    fiveK: [{
        type: Schema.Types.ObjectId,
        ref: "FiveK"
    }],

    photos: {},
    created: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dayjs(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
    },
    modified: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dayjs(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
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

}, {
    toJSON: {
        getters: true
    },
    id: false
});

UserSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

UserSchema.methods.validPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};


// const User = model('User', UserSchema, 'auth');
const User = model('User', UserSchema);



module.exports = User;