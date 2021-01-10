const router = require('express').Router();
const { sendMessage } = require('../controller/ngrok-controller');


router.route('/')
    .post(sendMessage);

// this will hit /ngrok

router.get("/", (req, res) => {
    console.log("req: ", req);
    res.send("What the fuck is happening here?");
})


module.exports = router;