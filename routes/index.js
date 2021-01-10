const router = require('express').Router();

const ngrok = require('./ngrok');
const oAuthRoutes = require('./oauth');
const strava = require('./strava');
const url = require('url');
const slack = require('./slack');
const sugarwod = require('./sugarwod');




router.use('/oauth', oAuthRoutes);
router.use('/ngrok', ngrok);
router.use('/strava', strava);
router.use('/slack', slack);
router.use('/sugarwod', sugarwod);




module.exports = router;