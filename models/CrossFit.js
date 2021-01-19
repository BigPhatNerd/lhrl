var { Schema, model, Types } = require('mongoose');

const crossFitSchema = new Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    },
    title: {
type: String,
unique: true
    },

    type: {
        type: String
    },
    description: {
        type: String
    },

    score_type: {
        type: String
    },

}, {
    toJSON: {
        virtuals: true
    }
});



const CrossFit = model("CrossFit", crossFitSchema);

module.exports = CrossFit;