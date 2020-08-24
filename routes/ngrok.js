const router = require('express').Router();
const ngrok = require('../controller/ngrok-controller');
const { sendMessage } = require('../controller/ngrok-controller');


router.route('/')
    .post(sendMessage);


module.exports = router;