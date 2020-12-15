const { User, Program } = require('../../models');
const { slack } = require('../../lib/keys.js');
const { Types } = require('mongoose');

const { botToken, verificationToken } = slack;
const web = require('../../config/slack-web-api.js');
const homepage = require('../homepage/homeview.js');
const fiveK = require('../../programs/fiveK');
const tenK = require('../../programs/tenK');
var dayjs = require('dayjs');
// var date = dayjs().format('YYYY-MM-D');

const selectedProgramController = {
    getPlanWorkouts(req, res) {
        const username = req.params.username
        User.find({ username })
            .populate({
                path: 'selectedProgram',
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
        var program;
        const programSelected = req.params.value;
        switch (programSelected) {
            case "5K":
                program = fiveK;
                break;
            case "10K":
                program = tenK;
        }

        res.json(program());
    },
    async subscribeToPlan({ params, body }, res) {
        try {
            const programSelected = params.value;
            switch (programSelected) {
                case "5K":
                    program = fiveK;
                    break;
                case "10K":
                    program = tenK;
            }
            const startDate = body.startDate;
            const username = params.username;
            const createProgram = await Program.create(program(startDate, username));

            const userId = await User.findOneAndUpdate({ username: params.username }, { $set: { selectedProgram: createProgram } });

            res.json(userId);
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }


    },
    async deleteProgram({ params, body }, res) {
        User.findOneAndUpdate({ username: params.username }, { $set: { selectedProgram: [] } }, { new: true })
            .then(programData => {
                res.json(programData);
            })
    },
    async completePlanWorkout({ params, body }, res) {
        try {
            const username = params.username;
            const id = params.id;
            const data = {
                completed: true,
                time: body.time
            }

            const completeWorkout = await Program.findOneAndUpdate({ _id: id }, data, { new: true });
            const addWorkout = await User.findOneAndUpdate({ username: username }, { $push: { finishedWorkouts: completeWorkout } }, { new: true });

            res.send(addWorkout);

        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
}




module.exports = selectedProgramController;