var { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
const finishedWorkoutSchema = new Schema({
    userId: {
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
        type: Number
    },
    miles: {
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
    }

}, {
    toJSON: {
        virtuals: true
    }
});



const FinishedWorkout = model("FinishedWorkout", finishedWorkoutSchema);

module.exports = FinishedWorkout;