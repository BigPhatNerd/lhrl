var { Schema, model, Types } = require('mongoose');

const tenKSchema = new Schema({
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

const TenK = model("TenK", tenKSchema);

module.exports = TenK;