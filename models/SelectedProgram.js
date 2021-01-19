var { Schema, model, Types } = require('mongoose');

const selectedProgramSchema = new Schema({
    userId: {
        type: String
    },
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
    seconds: {
        type: Number,
        default: 0
    },
    minutes: {
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
    notes: {
        type: String
    },
    meters: {
        type: Number,
        default: 0
    },
    subscribed: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    dateCompleted: {
        type: Date
    },

});

const Program = model("Program", selectedProgramSchema);

module.exports = Program;