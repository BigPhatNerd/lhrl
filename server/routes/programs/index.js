const fiveK = require('./fiveK');
const tenK = require('./tenK');
const selectedProgram = require('./selectedProgram');
const router = require('express').Router();

router.use('/selectedProgram', selectedProgram);
router.use('/fiveK', fiveK);
router.use('/tenK', tenK);

module.exports = router;