const router = require('express').Router();


const {
    createFinishedWorkouts,
    showFinishedWorkouts,
    editFinishedWorkouts,
    deleteFinishedWorkouts,
} = require('../../controller/finishedWorkouts');

router.route('/:user_id')
    .get(showFinishedWorkouts)
    .post(createFinishedWorkouts);

router.route('/edit/:workoutId').put(editFinishedWorkouts);
router.route('/delete/:workoutId').delete(deleteFinishedWorkouts);

module.exports = router;