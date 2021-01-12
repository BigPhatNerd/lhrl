const router = require('express').Router();
const axios = require('axios');
const web = require('../../config/slack-web-api.js');
const slashCreateWorkout = require('../../controller/slashMessageBlocks/createWorkout');
const slashViewCreatedWorkouts = require('../../controller/slashMessageBlocks/viewCreatedWorkouts');
const slashSubscribeToProgram = require('../../controller/slashMessageBlocks/subscribeToProgram');
const {
    divider,
    welcome,
    currentlySubscribed,
    todaysWorkout,
    removeFromProgram,
    weeklyGoals,
    enterGoalReps,

} = require('../../controller/homepage/helpers');
const open = require('open');
const {
    cfWOD,
    cfHeader
} = require('../../controller/homepage/helpers/sugarWod');
const { sugarwod, url } = require('../../lib/keys');
const sugarWodConfig = { 'Authorization': sugarwod.sugarwodKey };
const urlString = process.env.NODE_ENV === "production" ? url.production : url.development
router.post('/create-workout', (req, res) => {

    res.send({
        "blocks": [slashCreateWorkout]
    })
});

router.post('/view-created-workouts', (req, res) => {
    res.send({
        "blocks": [slashViewCreatedWorkouts]
    })
});

router.post('/subscribe-to-program', (req, res) => {
    res.send({
        "blocks": [slashSubscribeToProgram]
    })
});

router.post('/view-program-workouts', async (req, res) => {
    const user_id = req.body.user_id;
    const allWorkouts = await axios.get(`${urlString}/getEverything/${user_id}`);
    res.send({
        "blocks": [currentlySubscribed(allWorkouts)]
    })
});
router.post('/enter-todays-score', async (req, res) => {
    const user_id = req.body.user_id;
    const allWorkouts = await axios.get(`${urlString}/getEverything/${user_id}`);
    res.send({
        "blocks": [todaysWorkout(allWorkouts)]
    })
})

router.post('/remove-from-program', async (req, res) => {
    const user_id = req.body.user_id;
    const allWorkouts = await axios.get(`${urlString}/getEverything/${user_id}`);
    res.send({
        "blocks": [removeFromProgram(allWorkouts)]
    })
});

router.post('/goal-summary', async (req, res) => {
    const user_id = req.body.user_id;
    const allWorkouts = await axios.get(`${urlString}/getEverything/${user_id}`);
    res.send({
        "blocks": [weeklyGoals(allWorkouts)]
    })
});

router.post('/enter-goal-reps', async (req, res) => {
    const user_id = req.body.user_id;
    const allWorkouts = await axios.get(`${urlString}/getEverything/${user_id}`);
    res.send({
        "blocks": [enterGoalReps(allWorkouts)]
    })
});

router.post('/cf-wod', async (req, res) => {
    const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });
    res.send({
        "blocks": [cfWOD(wod)]
    })
});

router.post('/lhrl', async (req, res) => {
    const team_id = req.body.team_id;
    const api_app_id = req.body.api_app_id;
    res.redirect(303, `slack://app?team=${team_id}&id=${api_app_id}&tab=home`)

});







module.exports = router;