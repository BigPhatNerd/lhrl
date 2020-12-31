const { User, FinishedWorkout, WeeklyGoal } = require('../../models');

const dayjs = require('dayjs');
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear);

const finishedWorkouts = {
    async createFinishedWorkouts({ params, body }, res) {
        try {
            const user_id = params.user_id;
            const finishedWorkout = await FinishedWorkout.create(body);

            const addFinishedWorkout = await User.findOneAndUpdate({ user_id: user_id }, { $push: { finishedWorkouts: finishedWorkout } }, { new: true })
            res.json(addFinishedWorkout);
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },

    async showFinishedWorkouts({ params, body }, res) {
        const user_id = params.user_id;
        const userWorkouts = await User.find({ user_id })
            .populate({
                path: 'finishedWorkouts',
                select: '-__v'
            })
            .select('-__v');
        res.json(userWorkouts)

    },

}

module.exports = finishedWorkouts;