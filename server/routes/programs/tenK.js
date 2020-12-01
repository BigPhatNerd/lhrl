const router = require('express').Router();
const program = require('../../programs/tenK');
const FiveK = require('../../models/TenK');
const {
    subscribeToPlan,
    viewProgram
} = require('../../controller/programs/tenK-controller');


router.route('/subscribe/:username').post(subscribeToPlan);

router.route('/view-program').get(viewProgram)
module.exports = router;