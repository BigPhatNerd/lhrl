const { User } = require('../../models');

const everything = {
    async getEverything({ params, body }, res) {
        const username = params.username;
        const everything = await User.find({ username })
            .populate([
                { path: 'workouts' },
                { path: 'selectedProgram' },
                { path: 'finishedWorkouts' },
                { path: 'weeklyGoals' }
            ])
            .select('-__v');
        res.json(everything);
    }
}

module.exports = everything;