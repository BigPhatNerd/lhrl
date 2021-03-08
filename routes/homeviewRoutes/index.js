const router = require('express').Router();
const axios = require('axios');
const web = require('../../config/slack-web-api.js');
const slashCreateWorkout = require('../../controller/slashMessageBlocks/createWorkout');
const slashViewCreatedWorkouts = require('../../controller/slashMessageBlocks/viewCreatedWorkouts');
const homeModal = require('../../controller/homepage/homeModal.js');
const { User, CrossFit, OAuth } = require('../../models');
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
    try {

        const { user_id, api_app_id, trigger_id, response_url } = req.body;
        res.send(200, "Opening LHRL Modal");
        const findToken = await OAuth.findOne({ team_id: req.body.team_id })
        const webAPI = web(findToken.access_token)
        const userInfo = await webAPI.users.info({ user: user_id });
        const passUser = userInfo.user;
        const team_id = userInfo.user.team_id;

        const createUser = await User.findOneAndUpdate({ user_id: passUser.id }, { $set: { team_id: team_id, user_name: passUser.name, api_app_id: api_app_id } }, { upsert: true, new: true });

        const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);

        const wod = await CrossFit.find().limit(1).sort({ date: -1 });

        webAPI.views.open(homeModal(trigger_id, passUser, allWorkouts, wod[0]))



    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }

});







module.exports = router;