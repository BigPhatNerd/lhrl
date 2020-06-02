const ngrok = require('./ngrok');
const twitter = require('./twitter');
const garmin = require('./garmin');
const oAuthRoutes = require('./oauth');
const strava = require('./strava');
const url = require('url');
const router = require('express').Router();

router.use('/oauth', oAuthRoutes);
router.use('/ngrok', ngrok);
router.use('/twitter', twitter);
router.use('/strava', strava);
router.use('/garmin', garmin);





module.exports = router;