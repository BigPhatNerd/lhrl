const { User, FinishedWorkout, WeeklyGoal } = require('../../models');

const dayjs = require('dayjs');
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear);

const finishedWorkouts = {
    async createFinishedWorkouts({ params, body }, res) {
        try {
            const username = params.username;
            const finishedWorkout = await FinishedWorkout.create(body);
            console.log("username: ", username);
            console.log("finishedWorkout: ", finishedWorkout);
            const addFinishedWorkout = await User.findOneAndUpdate({ username: username }, { $push: { finishedWorkouts: finishedWorkout } }, { new: true })
            res.json(addFinishedWorkout);
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },

    async showFinishedWorkouts({ params, body }, res) {
        const username = params.username;
        const userWorkouts = await User.find({ username })
            .populate({
                path: 'finishedWorkouts',
                select: '-__v'
            })
            .select('-__v');
        res.json(userWorkouts)

    },

}

module.exports = finishedWorkouts;