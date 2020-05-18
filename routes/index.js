const command = require('./command');
const oAuthRoutes = require('./oauth');
const url = require('url');
const router = require('express').Router();

router.use('/oauth', oAuthRoutes);
router.use('/command', command);

module.exports = router;