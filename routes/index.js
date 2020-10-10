const ngrok = require('./ngrok');
const oAuthRoutes = require('./oauth');
const strava = require('./strava');
const url = require('url');
const slack = require('./slack');
const htmlRoutes = require("./html-routes");
const router = require('express').Router();

router.use('/oauth', oAuthRoutes);
router.use('/ngrok', ngrok);
router.use('/strava', strava);
router.use('/slack', slack);
router.use('/', htmlRoutes);


module.exports = router;