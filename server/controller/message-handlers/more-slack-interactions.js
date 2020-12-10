const moreSlackInteractions = require('./../../config/slack-interactions.js');





module.exports = {
    middleware: moreSlackInteractions.expressMiddleware()
}