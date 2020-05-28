const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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

});
const User = mongoose.model('user', userSchema)
module.exports = User;





//