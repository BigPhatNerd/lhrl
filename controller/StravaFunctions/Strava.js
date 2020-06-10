var Strava = require('strava-v3');
const { strava } = require('../../lib/keys');

Strava.config({
    "access_token": strava.accessToken,
    "client_id": strava.clientId,
    "client_secret": strava.clientSecret,
    "redirect_uri": " http://lhrlslacktest.ngrok.io/strava/redirect"
});


Strava.clubs.get({ id: 'LHRL' }, function(err, payload, limits) {
    console.log(payload.description);
})
const auth_link = "https://www.strava.com/oauth/token"