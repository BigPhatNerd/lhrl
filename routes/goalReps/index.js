const router = require('express').Router();


const {
    createGoalReps,
    showGoalReps,
    updateGoalReps,
    deleteGoalReps,
} = require('../../controller/goalReps');

router.route('/:user_id')
    .get(showGoalReps)
    .post(createGoalReps);


module.exports = router;