const { User, FiveK, TenK, Program } = require('../../models');
const { slack } = require('../../lib/keys.js');

const { botToken, verificationToken } = slack;
const web = require('../../config/slack-web-api.js');
const homepage = require('../homepage/homeview.js');
const fiveK = require('../../programs/fiveK');
const tenK = require("../../programs/tenK");
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
        var Model;
        const programSelected = req.params.value;

        switch (programSelected) {
            case "5K":
                program = fiveK;
                Model = FiveK;
                break;
            case "10K":
                program = tenK;
                Model = TenK

        }

        // ViewProgram.deleteMany({})
        //     .then(() => ViewProgram.collection.insertMany(program(Date.now())))
        //     .then(data => {
        //         console.log(data.result.n + " records inserted!");
        Model.find()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.error(err);
                process.exit(1);
            })
    },
    async subscribeToPlan({ params, body }, res) {

        const programSelected = params.value;
        switch (programSelected) {
            case "5K":
                program = fiveK;
                break;
            case "10K":
                program = tenK;

        }
        const startDate = body.startDate
        const insertProgram = program(startDate);

        Program.deleteMany({})
            .then(() => Program.collection.insertMany(insertProgram))
            .then((data) => {

                // 
                return User.findOneAndUpdate({ username: params.username }, { $set: { selectedProgram: data.ops } }, { new: true })
                    .then(programData => {
                        if(!programData) {
                            res.status(404).json({ message: "No user found with this id" });
                            return
                        }
                        res.json(programData);
                    })
            })
            .catch(err => {
                console.error(err.message);
                res.status(500).send("Server Error!");
            })
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
            const addWorkout = await User.findOneAndUpdate({ username: username }, { $push: { workouts: completeWorkout } }, { new: true });

            res.send(addWorkout);
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
}




module.exports = selectedProgramController;