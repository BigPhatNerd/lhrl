var { Schema, model, Types } = require('mongoose');

const finishedWorkoutSchema = new Schema({
    name: {
        type: String
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

});

const FinishedWorkout = model("FinishedWorkout", finishedWorkoutSchema);

module.exports = FinishedWorkout;