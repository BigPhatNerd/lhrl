const fiveK = require('./fiveK');
const router = require('express').Router();

router.use('/fiveK', fiveK);

module.exports = router;