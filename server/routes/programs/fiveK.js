const router = require('express').Router();
const program = require('../../programs/fiveK');
const FiveK = require('../../models/FiveK');
const {
    subscribeToPlan,
    viewProgram
} = require('../../controller/programs/fiveK-controller');

console.log("PROGRAM: ", program);

router.route('/subscribe/:username').post(subscribeToPlan);

router.route('/view-program').get(viewProgram)
module.exports = router;