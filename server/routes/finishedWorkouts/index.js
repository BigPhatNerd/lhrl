const router = require('express').Router();


const {
    createFinishedWorkouts,
    showFinishedWorkouts,
    updateFinishedWorkouts,
    deleteFinishedWorkouts,
} = require('../../controller/finishedWorkouts');

router.route('/:username')
    .get(showFinishedWorkouts)
    .post(createFinishedWorkouts);


module.exports = router;