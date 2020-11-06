var { Schema, model } = require('mongoose');

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [{

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
        }
    }]

}, {
    toJSON: {
        // include any virtual properties when data is requested
        virtuals: true
    }
});
// adds a dynamically-created property to schema
workoutSchema.virtual('totalDuration').get(function() {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercise.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0)
})

const Workout = model("Workout", workoutSchema);

module.exports = Workout;


//