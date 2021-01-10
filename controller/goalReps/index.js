const { User, GoalReps, WeeklyGoal } = require('../../models');

const dayjs = require('dayjs');
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear);

const goalReps = {
    async createGoalReps({ params, body }, res) {
        try {
            const user_id = params.user_id;
            const finishedGoalReps = await GoalReps.create(body);

            const addGoalReps = await User.findOneAndUpdate({ user_id: user_id }, { $push: { goalReps: finishedGoalReps } }, { new: true })
            res.json(addGoalReps);
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },

    async showGoalReps({ params, body }, res) {
        const user_id = params.user_id;
        const userWorkouts = await User.find({ user_id })
            .populate({
                path: 'goalReps',
                select: '-__v'
            })
            .select('-__v');
        res.json(userWorkouts)

    },

}

module.exports = goalReps;