const router = require('express').Router();
const web = require('../../config/slack-web-api.js');
const slashCreateWorkout = require('../../controller/slashMessageBlocks/createWorkout')

router.post('/create-workout', (req, res) => {
    const channel_id = req.body.channel_id;

    res.send({
        "blocks": [slashCreateWorkout]
    })
});


module.exports = router;