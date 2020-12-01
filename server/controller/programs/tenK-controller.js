const { User, TenK } = require('../../models');
const { slack } = require('../../lib/keys.js');

const { botToken, verificationToken } = slack;
const web = require('../../config/slack-web-api.js');
const homepage = require('../homepage/homeview.js');
const program = require('../../programs/tenK');
var dayjs = require('dayjs');
// var date = dayjs().format('YYYY-MM-D');

const tenKController = {
    getWorkouts(req, res) {
        const username = req.params.username
        User.find({ username })
            .populate({
                path: 'tenK',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbRes => {
                res.json(dbRes)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    viewProgram(req, res) {

        TenK.deleteMany({})
            .then(() => TenK.collection.insertMany(program(Date.now())))
            .then(data => {
                console.log(data.result.n + " records inserted!");
                TenK.find()
                    .then(data => {
                        res.json(data);
                    })
            })

            .catch(err => {
                console.error(err);
                process.exit(1);
            })
    },
    async subscribeToPlan({ params, body }, res) {
        const startDate = body.startDate
        const insertProgram = program(startDate);
        TenK.deleteMany({})
            .then(() => TenK.collection.insertMany(insertProgram))
            .then((data) => {
                return User.findOneAndUpdate({ username: params.username }, { $set: { tenK: data.ops } }, { new: true })
            })
            .then(programData => {
                if(!programData) {
                    res.status(404).json({ message: "No user found with this id" });
                    return
                }
                res.json(programData);
            })
            .catch(err => {
                console.error(err.message);
                res.status(500).send("Server Error!");
            })
    }


}

module.exports = tenKController;