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
        required: "Enter and exercises type"
    },
    name: {
        type: String,
        trim: true,
        required: "Enter and exercise name"
    },
    duration: {
        type: Number,
        required: "Enter and exercise duration in minutes"
    },
    weight: {
        type: Number
    },
    reps: {
        type: Number
    },
    sets: {
        type: Number
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
        type: String
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
    }


}, {
    toJSON: {
        // include any virtual properties when data is requested
        virtuals: true
    }
});


const Workout = model("Workout", workoutSchema);

module.exports = Workout;


//