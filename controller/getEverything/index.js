const { User } = require('../../models');

const everything = {
    async getEverything({ params, body }, res) {
        const user_id = params.user_id;
        const everything = await User.find({ user_id })
            .populate([
                { path: 'workouts' },
                { path: 'selectedProgram' },
                { path: 'finishedWorkouts' },
                {
                    path: 'weeklyGoals',
                    options: { sort: { 'date': -1 } }
                }
            ])
            .select('-__v');
        res.json(everything);
    }
}

module.exports = everything;