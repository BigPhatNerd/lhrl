const router = require('express').Router();


router.route('/')
    .post((req, res) => {
        res.send("Your ngrok tunnel is up and running");
    });


module.exports = router;