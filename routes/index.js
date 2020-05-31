const command = require('./command');
const twitter = require('./twitter');

const oAuthRoutes = require('./oauth');
const strava = require('./strava');
const url = require('url');
const router = require('express').Router();

router.use('/oauth', oAuthRoutes);
router.use('/command', command);
router.use('/twitter', twitter);
router.use('/strava', strava);




module.exports = router;