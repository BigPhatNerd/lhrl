const router = require('express').Router();
const createWorkout = require('./../controller/forms/createWorkout.js');
const { slack } = require('./../lib/keys.js');
const { botToken, verificationToken, } = slack;
const web = require('./../config/slack-web-api.js');
const homepage = require('../controller/homepage/homeview.js');
const { User, Workout } = require('../models');
const mongoose = require('mongoose');


router.get("/get-workouts", (req, res) => {
    User.find({})
        .populate({
            path: 'workouts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})
router.post('/create-workout/:username', async ({ params, body }, res) => {
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
})

router.post('/play', (req, res) => {
    res.json("just playing in the slash commands");
});


router.post('/events', (req, res) => {
    res.send(req.body);
    const { user } = req.body.event;
    web.views.publish(homepage(user));
})

router.post('/create-workout', async (req, res) => {

})
router.post('/slash-commands/send-me-buttons', (req, res) => {

})

router.post('/external-data', (req, res) => {
    res.send("I think someone is typing on my app.")
})

module.exports = router;


//