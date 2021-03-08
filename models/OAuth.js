var { Schema, model, Types } = require('mongoose');

const oauthSchema = new Schema({

    team_id: {
        type: String
    },
    enterprise_id: {
        type: String
    },
    app_id: {
        type: String
    },
    authed_user_id: {
        type: String
    },
    authed_user_access_token: {
        type: String
    },
    bot_user_id: {
        type: String
    },
    access_token: {
        type: String
    },

})

const OAuth = model("OAuth", oauthSchema);

module.exports = OAuth;