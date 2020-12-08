const selectedProgram = require('./selectedProgram');
const viewProgram = require('./viewProgram');
const router = require('express').Router();

router.use('/selectedProgram', selectedProgram);
router.use('/viewProgram', viewProgram);


module.exports = router;