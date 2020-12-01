const fiveK = require('./fiveK');
const tenK = require('./tenK');
const router = require('express').Router();

router.use('/fiveK', fiveK);
router.use('/tenK', tenK);

module.exports = router;