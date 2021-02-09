var { Schema, model, Types } = require('mongoose');

const finishedWorkoutSchema = new Schema({
    userId: {
        type: String
    },
    stravaId: {
        type: String
    },

    stravaAvatar: {
        type: String
    },
    name: {
        type: String
    },
    pushups: {
        type: Number,
        default: 0
    },
    situps: {
        type: Number,
        default: 0
    },
    squats: {
        type: Number,
        default: 0
    },
    distance: {
        type: Number,
        default: 0
    },
    miles: {
        type: Number,
        default: 0
    },
    meters: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date
    },
    dateCompleted: {
        type: Date
    },
    week: {
        type: Number
    },
    day: {
        type: Number
    },
    type: {
        type: String
    },
    description: {
        type: String
    },
    time: {
        type: Number
    },
    score_type: {
        type: String
    },
    rounds: {
        type: Number,
        default: 0
    },
    reps: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    seconds: {
        type: Number,
        default: 0
    },
    minutes: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        default: "No notes recorded"
    },

    subscribed: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    }

}, {
    toJSON: {
        virtuals: true
    }
});



const FinishedWorkout = model("FinishedWorkout", finishedWorkoutSchema);

module.exports = FinishedWorkout;