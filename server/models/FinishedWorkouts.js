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
        type: Number
    },
    situps: {
        type: Number
    },
    squats: {
        type: Number
    },
    miles: {
        type: Number
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