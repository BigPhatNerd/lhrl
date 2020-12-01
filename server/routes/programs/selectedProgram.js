const router = require('express').Router();
const selectedProgram = require('../../models/SelectedProgram');
const {
    subscribeToPlan,
    viewProgram
} = require('../../controller/programs/selectedProgram-controller');


router.route('/subscribe/:username').post(subscribeToPlan);

router.route('/view-program').get(viewProgram)
module.exports = router;