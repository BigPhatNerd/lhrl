var { Schema, model, Types } = require('mongoose');
var bcrypt = require('bcrypt');

var dayjs = require("dayjs");

var UserSchema = new Schema({
    provider: {
        type: String,
        default: ''
    },
    stravaChannel: {
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
    private: {
        type: Boolean,
        default: true
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


    },
    team_id: {
        type: String
    },
    user_id: {
        type: String
    },
    user_name: {
        type: String
    },
    api_app_id: {
        type: String
    },

    email: {
        type: String,


    },
    // The password cannot be null
    password: {
        type: String,

    },
    goalReps: [{
        type: Schema.Types.ObjectId,
        ref: "GoalReps"
    }],
    cfWods: [{
        type: Schema.Types.ObjectId,
        ref: "CrossFit"
    }],
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: "Workout"
    }],
    stravaWorkouts: [{
        type: Schema.Types.ObjectId,
        ref: "Strava"
    }],


    selectedProgram: [{
        type: Schema.Types.ObjectId,
        ref: "Program"
    }],
    finishedWorkouts: [{
        type: Schema.Types.ObjectId,
        ref: "FinishedWorkout"
    }],
    weeklyGoals: [{
        type: Schema.Types.ObjectId,
        ref: "WeeklyGoal"
    }],
    session: [{
        type: Schema.Types.ObjectId,
        ref: "Session"
    }],
    oauth: [{
        type: Schema.Types.ObjectId,
        ref: "OAuth"
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

// UserSchema.pre('save', async function(next) {
//     if(this.isNew || this.isModified('password')) {
//         const saltRounds = 10;
//         this.password = await bcrypt.hash(this.password, saltRounds);
//     }

//     next();
// });

// UserSchema.methods.validPassword = async function(password) {
//     return bcrypt.compare(password, this.password);
// };


// const User = model('User', UserSchema, 'auth');
const User = model('User', UserSchema);



module.exports = User;