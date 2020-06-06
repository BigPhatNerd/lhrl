var Twitter = require("twitter");
const { twitter } = require('../../lib/keys');

var client = new Twitter({
    consumer_key: twitter.apiKey,
    consumer_secret: twitter.apiSecretKey,
    access_token_key: twitter.accessToken,
    access_token_secret: twitter.secretToken
})


const twitterMyStatus = (screenName) => {
    var params = { screen_name: screenName };
    return client.get('statuses/user_timeline', params)
        .then((tweet) => {
            // console.log(tweet[0].text);
            // console.log("TWEET RETURN: " + JSON.stringify(tweet));
            return JSON.stringify(tweet[0].text)
        })
};




const twitterFavorites = () => {
    client.get('favorites/list', (error, tweets, response) => {
        if (error) throw error;
        // console.log(response.body.text);
        // console.log(response);
    })
}

module.exports = {
    twitterMyStatus
}