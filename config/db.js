const mongoose = require('mongoose');
const { mongo } = require('../lib/keys');


const connectDB = async () => {
    const database = process.env.NODE_ENV === "production" ? process.env.NODE_ENV :  "mongodb://localhost/lhrl_slack_app";
    try {
        await mongoose.connect(database, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })



        console.log('MongoDB Connected...');

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;