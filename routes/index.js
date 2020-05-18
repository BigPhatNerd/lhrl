const command = require('./command');
const garmin = require('./garmin');
const oAuthRoutes = require('./oauth');
const url = require('url');
const router = require('express').Router();

router.use('/oauth', oAuthRoutes);
router.use('/command', command);
router.use('/garmin', garmin);

module.exports = router;