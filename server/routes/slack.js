const router = require('express').Router();
const createWorkout = require('./../controller/forms/createWorkout.js');
const { slack } = require('./../lib/keys.js');
const { botToken, verificationToken, } = slack;
const web = require('./../config/slack-web-api.js');
const homepage = require('../controller/homepage/homeview.js');
const { User, Workout } = require('../models');
const mongoose = require('mongoose');


router.put("/edit-workout/:workoutId", async ({ body, params }, res) => {
    try {
        const workoutId = params.workoutId
        console.log("params: ", params);
        console.log("Edit Wrokout route is being hit!");
        console.log("workoutId: ", workoutId);
        console.log(typeof workoutId);
        const workout = await Workout.findByIdAndUpdate(workoutId, body, { new: true, runValidators: true });
        res.json(workout)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }



})
router.get("/get-workouts/:username", (req, res) => {
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
});

router.delete("/delete-workout/:workoutId", async ({ params, body }, res) => {
    try {
        const id = params.workoutId;
        const deletedWorkout = await Workout.findByIdAndDelete(id);
        res.json("Workout Deleted")
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

router.post('/play', (req, res) => {
    res.json("just playing in the slash commands");
});


router.post('/events', (req, res) => {
    res.send(req.body);
    const { user } = req.body.event;
    web.views.publish(homepage(user));
})


router.post('/slash-commands/send-me-buttons', (req, res) => {

})

router.post('/external-data', (req, res) => {
    res.send("I think someone is typing on my app.")
})

module.exports = router;


//