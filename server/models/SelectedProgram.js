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

});

const Program = model("Program", selectedProgramSchema);

module.exports = Program;