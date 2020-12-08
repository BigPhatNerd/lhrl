const router = require('express').Router();
const selectedProgram = require('../../models/SelectedProgram');
const {
    subscribeToPlan,
    viewProgram,
    getPlanWorkouts,
    deleteProgram
} = require('../../controller/programs/selectedProgram-controller');


router.route('/subscribe/:username/:value').post(subscribeToPlan);
router.route('/get-workouts/:username').get(getPlanWorkouts);

router.route('/view-program/:value').get(viewProgram);
router.route('/delete-program/:username').delete(deleteProgram)


module.exports = router;