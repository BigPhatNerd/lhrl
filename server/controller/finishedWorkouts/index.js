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
    async editFinishedWorkouts({ params, body }, res) {
        try {
            const workoutId = params.workoutId;
            const workout = await FinishedWorkout.findByIdAndUpdate(workoutId, body, { new: true, runValidators: true });
            res.json(workout)
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    async deleteFinishedWorkouts({ params, body }, res) {
        try {
            const id = params.workoutId;

            const deletedWorkout = await FinishedWorkout.findByIdAndUpdate(id);
            res.json("Workout deleted");
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

}

module.exports = finishedWorkouts;