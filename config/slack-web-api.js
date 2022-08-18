
const { WebClient, LogLevel } = require('@slack/web-api');


const web = (token) => {
    const getToken =
        new WebClient(token, {
            // logLevel: LogLevel.DEBUG,
            retries: 0
        });
        
    return getToken
}

module.exports = web
