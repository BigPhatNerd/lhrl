var { Schema, model, Types } = require('mongoose');

const sessionSchema = new Schema({
    expires: {
        type: Date
    },
    session: {
        type: String
    },
    userId: {
        type: String
    }
})

const Session = model("Session", sessionSchema);

module.exports = Session;