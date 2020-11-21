const router = require('express').Router();
const { sendMessage } = require('../controller/ngrok-controller');


router.route('/')
    .post(sendMessage);


module.exports = router;