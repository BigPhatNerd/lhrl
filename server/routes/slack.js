const router = require('express').Router();

const {
    editWorkout,
    getWorkouts,
    saveWorkout,
    deleteWorkout,
    publishHomepage,
} = require('../controller/slack-controller');


router.route("/edit-workout/:workoutId").put(editWorkout);
router.route("/get-workouts/:username").get(getWorkouts);
router.route('/create-workout/:username').post(saveWorkout);
router.route("/delete-workout/:workoutId").delete(deleteWorkout);

router.route('/events').post(publishHomepage);



router.post('/slash-commands/send-me-buttons', (req, res) => {

})

router.post('/external-data', (req, res) => {
    res.send("I think someone is typing on my app.")
})

module.exports = router;


//