const router = require('express').Router();



router.post('/play', (req, res) => {
    res.send("In the slack.js routes");
    console.log("Whatever");
})

module.exports = router;

//