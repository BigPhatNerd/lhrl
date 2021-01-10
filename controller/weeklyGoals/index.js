const { User, FinishedWorkout, WeeklyGoal } = require('../../models');
const dayjs = require('dayjs');
const weeklyGoals = {

    async createGoals({ params, body }, res) {
        try {
            const user_id = params.user_id;
            const weeklyGoal = await WeeklyGoal.create(body);
            const addGoal = await User.findOneAndUpdate({ user_id: user_id }, { $push: { weeklyGoals: weeklyGoal } }, { new: true });
            res.json(addGoal);
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    async showGoals({ params, body }, res) {
        const user_id = params.user_id;
        const thisWeek = dayjs().startOf('week');
        const userWeekGoals = await User.find({ user_id: user_id })
            .populate({
                path: 'weeklyGoals',
                select: '-__v'
            })
            .select('-__v');
        const goalsArray = userWeekGoals[0].weeklyGoals;
        const filterThisWeek = goalsArray.filter(goals => {
            console.log("goals.date: ", goals.date);
            console.log("thisWeek.toDate(): ", thisWeek.toDate());
            return goals.date >= thisWeek.toDate() && goals.date <= dayjs(thisWeek).endOf('week').toDate()
        });
        res.json(filterThisWeek);
    },
    async updateGoals({ params, body }, res) {
        try {
            const goalsId = params.weeklyGoalId;
            const goal = await WeeklyGoal.findByIdAndUpdate(goalsId, body, { new: true });
            res.json(goal);
        } catch (err) {

            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = weeklyGoals