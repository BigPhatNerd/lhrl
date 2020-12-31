var { Schema, model, Types } = require('mongoose');

const workoutSchema = new Schema({
    userId: {
        type: String
    },
    day: {
        type: Date,
        default: () => new Date()
    },
    type: {
        type: String,
        trim: true,

    },
    name: {
        type: String,
        trim: true,
    },
    duration: {
        type: Number,

    },
    weight: {
        type: Number,
        default: 0
    },
    reps: {
        type: Number,
        default: 0
    },
    rounds: {
        type: Number,
        default: 0
    },
    sets: {
        type: Number,
        default: 0
    },
    distance: {
        type: Number
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
    description: {
        type: String,
        default: "No description entered."
    },
    seconds: {
        type: Number,
        default: 0
    },
    minutes: {
        type: Number,
        default: 0
    },
    time: {
        type: Number
    },
    subscribed: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String,
        default: "No notes recorded."
    },


}, {
    toJSON: {
        // include any virtual properties when data is requested
        virtuals: true
    }
});


const Workout = model("Workout", workoutSchema);

module.exports = Workout;


//