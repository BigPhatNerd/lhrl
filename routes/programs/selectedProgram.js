const db = require('../../models')
const router = require('express').Router();

const {
    subscribeToPlan,
    viewProgram,
    getPlanWorkouts,
    deleteProgram,
    completePlanWorkout
} = require('../../controller/programs/selectedProgram-controller');


router.route('/enter-score/:user_id/:id').post(completePlanWorkout);


router.route('/subscribe/:user_id/:value').post(subscribeToPlan);
router.route('/get-workouts/:user_id').get(getPlanWorkouts);
router.route('/view-program/:value').get(viewProgram);
router.route('/delete-program/:user_id').delete(deleteProgram);

router.post('/test/:user_id/:value', async (req, res) => {
    const test = await db.User.find();
    res.json(test);

})


module.exports = router;