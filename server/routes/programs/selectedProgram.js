const router = require('express').Router();
const selectedProgram = require('../../models/SelectedProgram');
const {
    subscribeToPlan,
    viewProgram
} = require('../../controller/programs/selectedProgram-controller');


router.route('/subscribe/:username/:value').post(subscribeToPlan);

router.route('/view-program/:value').get(viewProgram)
module.exports = router;