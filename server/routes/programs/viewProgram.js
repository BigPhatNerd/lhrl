router = require('express').Router();

const {
    viewProgram
} = require('../../controller/programs/selectedProgram-controller');



router.route('/view-program/:value').get(viewProgram);

module.exports = router;