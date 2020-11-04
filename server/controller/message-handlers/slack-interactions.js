const slackInteractions = require('./../../config/slack-interactions.js');
const web = require('../../config/slack-web-api.js');
const createWorkout = require('../forms/createWorkout.js');



slackInteractions.viewSubmission('create_form', async (payload, respond) => {
    try {

        console.log("We are hitting here!");
        const { trigger_id } = payload;
        web.views.open(createWorkout(trigger_id))
        console.log("payload: ", payload);

    } catch (err) {

        console.error(err.message);

    }

})


module.exports = {
    middleware: slackInteractions.expressMiddleware()
}