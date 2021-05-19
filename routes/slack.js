const router = require('express').Router();
const signVerification = require('../config/middleware/signVerification');
const { createEventAdapter } = require('@slack/events-api');



const {
    editWorkout,
    getWorkouts,
    saveWorkout,
    deleteWorkout,
    publishHomepage,
} = require('../controller/slack-controller');


router.route("/edit-workout/:workoutId").put(editWorkout);
router.route("/get-workouts/:user_id").get(getWorkouts);
router.route('/create-workout/:user_id').post(saveWorkout);
router.route("/delete-workout/:workoutId").delete(deleteWorkout);

router.route('/events').post(publishHomepage);



router.post('/slash-commands/send-me-buttons', (req, res) => {

})

router.post('/external-data', (req, res) => {
    res.send("I think someone is typing on my app.")
});




module.exports = router;


//