var { Schema, model, Types } = require('mongoose');

const viewProgramSchema = new Schema({
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

const ViewProgram = model("ViewProgram", viewProgramSchema);

module.exports = ViewProgram;