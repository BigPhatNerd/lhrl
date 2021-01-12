const router = require('express').Router();
const axios = require('axios');
const web = require('../../config/slack-web-api.js');
const slashCreateWorkout = require('../../controller/slashMessageBlocks/createWorkout');
const slashViewCreatedWorkouts = require('../../controller/slashMessageBlocks/viewCreatedWorkouts');
const homepage = require('../../controller/homepage/homeview.js');

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
        console.log("\n\n\n\n\n req: ", req);
        console.log("\n\n\n\nreq.body: ", req.body);
            

         
const { user, api_app_id } = req.body;
            const userInfo = await web.users.info({ user: user });
            const passUser = userInfo.user;


            const team_id = userInfo.user.team_id
            const createUser = await User.findOneAndUpdate({ team_id: team_id }, { $set: { user_id: passUser.id, user_name: passUser.name, api_app_id: api_app_id } }, { upsert: true, new: true });
            //Add axios call to get user's finished workouts and add the call to the homepage() function
            const allWorkouts = await axios.get(`${urlString}/getEverything/${passUser.id}`);
            //OBCF WOD url http://lhrlslacktest.ngrok.io/sugarwod/obcf-wod
            //CF WOD url https://api.sugarwod.com/v2/workoutshq
            // const wod = await axios.get('https://api.sugarwod.com/v2/workoutshq', { headers: sugarWodConfig });

            web.views.publish(homepage(passUser, allWorkouts));
    // res.redirect(`slack://app?team=${team_id}&id=${api_app_id}&tab=home`)
    web.views.publish(passUser, allWorkouts)
    } catch(err) {
        
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});







module.exports = router;