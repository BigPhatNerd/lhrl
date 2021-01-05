const { User, Program, FinishedWorkout } = require('../../models');
const homepage = require('../homepage/homeview.js');
const fiveK = require('../../programs/fiveK');
const tenK = require('../../programs/tenK');
var dayjs = require('dayjs');
// var date = dayjs().format('YYYY-MM-D');

const selectedProgramController = {
    getPlanWorkouts(req, res) {
        const user_id = req.params.user_id
        User.find({ user_id })
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
            console.log("\n\n\n\nparams", params);
            const programSelected = params.value;
            switch (programSelected) {
                case "5K":
                    program = fiveK;
                    break;
                case "10K":
                    program = tenK;
            }
            const startDate = body.startDate;
            const user_id = params.user_id;
            console.log('\n\n\n\nuser_id: ', user_id);
            const createProgram = await Program.create(program(startDate, user_id));

            const userId = await User.findOneAndUpdate({ user_id: user_id }, { $set: { selectedProgram: createProgram } });

            res.json(userId);
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }


    },
    async deleteProgram({ params, body }, res) {
        User.findOneAndUpdate({ user_id: params.user_id }, { $set: { selectedProgram: [] } }, { new: true })
            .then(programData => {
                res.json(programData);
            })
    },
    async completePlanWorkout({ params, body }, res) {
        try {
            console.log("\n\n\n\nbody: ", body);
            const user_id = params.user_id;
            const id = params.id;

            var minutes = parseInt(body.minutes) || 0;
            var seconds = parseInt(body.seconds) || 0;
            var date = new Date();
            const data = {
                completed: true,
                minutes: minutes,
                seconds: seconds,
                userId: user_id,
                dateCompleted: date
            }


            const completeWorkout = await Program.findOneAndUpdate({ _id: id }, data, { new: true });
            console.log("\n\ncompleteWorkout: ", completeWorkout);
            const dataForWorkout = {
                seconds: completeWorkout.seconds,
                minutes: completeWorkout.minutes,
                name: completeWorkout.name,
                week: completeWorkout.week,
                day: completeWorkout.day,
                type: completeWorkout.type,
                description: completeWorkout.description,
                dateCompleted: date
            }
            const addFinishedWorkout = await FinishedWorkout.create(dataForWorkout);
            const addWorkout = await User.findOneAndUpdate({ user_id: user_id }, { $push: { finishedWorkouts: addFinishedWorkout } }, { new: true });

            res.send(addWorkout);

        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
}




module.exports = selectedProgramController;