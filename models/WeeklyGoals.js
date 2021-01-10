var { Schema, model, Types } = require('mongoose');
const weeklyGoalSchema = new Schema({
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
    }
})

const WeeklyGoal = model("WeeklyGoal", weeklyGoalSchema);
module.exports = WeeklyGoal;