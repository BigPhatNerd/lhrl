const mongoose = require('mongoose');
const { mongo } = require('../lib/keys');
console.log('whatever');
const connectDB = async () => {
    try {
        await mongoose.connect(mongo.dbURI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;