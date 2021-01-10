var { Schema, model, Types } = require('mongoose');

const sessionSchema = new Schema({
    expires: {
        type: Date
    },
    session: {
        type: String
    },
    team_id: {
        type: String
    },
    api_app_id: {
        type: String
    },
    userId: {
        type: String
    }
})

const Session = model("Session", sessionSchema);

module.exports = Session;