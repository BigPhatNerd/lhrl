const router = require('express').Router();
const request = require("request");
const { twitterStuff } = require('../controller/LearningForms/learningForms');


const slackTest = require('../server');


slackTest.slackInteractions.action({ type: 'button' }, (payload, respond) => {
    console.log("What's up bitches!!!");
    console.log('payload', payload);
    console.log("YESSSSS");
    const test = twitterStuff.firstForm("Whatever");
    console.log(test);
    respond(test);

})



module.exports = router;