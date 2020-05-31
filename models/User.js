const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    twitterUsername: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    garminId: {
        type: String,
        required: false
    },
    stravaId: {
        type: String,
        required: false
    },
    sugarWodId: {
        type: String,
        required: false
    },
    twitterId: {
        type: String,
        required: false
    },
    twitterDisplayName: {
        type: String,
        required: false
    },
    twitterProfileImage: {
        type: String,
        required: false
    }

});
const User = mongoose.model('user', userSchema)
module.exports = User;





//