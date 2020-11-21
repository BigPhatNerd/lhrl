const { User, Workout } = require('../models');
const createWorkout = require('./forms/createWorkout.js');
const { slack } = require('../lib/keys.js');
const { botToken, verificationToken, } = slack;
const web = require('./../config/slack-web-api.js');
const homepage = require('./homepage/homeview.js');


const slackController = {
    async editWorkout({ body, params }, res) {
        try {
            const workoutId = params.workoutId
            const workout = await Workout.findByIdAndUpdate(workoutId, body, { new: true, runValidators: true });
            res.json(workout)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    },
    getWorkouts(req, res) {
        const username = req.params.username
        User.find({ username })
            .populate({
                path: 'workouts',
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

    async saveWorkout({ params, body }, res) {
        Workout.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ username: params.username }, { $addToSet: { workouts: _id } }, { new: true })
            })
            .then(workoutData => {
                if(!workoutData) {
                    res.status(404).json({ message: "No user found with that id!" })
                    return
                }
                res.json(workoutData);
            })
            .catch(err => {
                console.error(err.message);
                res.status(500).send('Server Error');
            })
    },
    async deleteWorkout({ params, body }, res) {
        try {
            const id = params.workoutId;
            const deletedWorkout = await Workout.findByIdAndDelete(id);
            res.json("Workout Deleted")
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    },
    publishHomepage(req, res) {
        res.send(req.body);
        const { user } = req.body.event;
        web.views.publish(homepage(user));
    },



}

module.exports = slackController;