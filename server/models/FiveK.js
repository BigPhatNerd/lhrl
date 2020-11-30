var { Schema, model, Types } = require('mongoose');

const fiveKSchema = new Schema({
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

const FiveK = model("FiveK", fiveKSchema);

module.exports = FiveK;