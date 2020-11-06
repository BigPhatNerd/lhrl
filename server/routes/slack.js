const router = require('express').Router();
const createWorkout = require('./../controller/forms/createWorkout.js');
const { slack } = require('./../lib/keys.js');
const { botToken, verificationToken, } = slack;
const web = require('./../config/slack-web-api.js');
const homepage = require('../controller/homepage/homeview.js');
const { User, Workout } = require('../models');



router.post('/create-workout', async ({ body, params }, res) => {
    try {
        params = "wilsonhorrell@gmail.com"
        const doc = await User.findOneAndUpdate(params, { $addToSet: { workouts: body } }, { new: true })
        return res.json(doc)
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

router.post('/create-workout', async (req, res) => {

})
router.post('/slash-commands/send-me-buttons', (req, res) => {

})

router.post('/external-data', (req, res) => {
    res.send("I think someone is typing on my app.")
})

module.exports = router;


//