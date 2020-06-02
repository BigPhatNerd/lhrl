const uuid = require('uuid');
const crypto = require('crypto');

const { garmin } = require('../lib/keys');
var User = require('../models/User')
var passport = require('passport'),
    OAuth1Strategy = require('passport-oauth').OAuthStrategy;

const queryParameters = {
    offset: 0,
    limit: 100,
    filter: "status='active'"
}



const oauth_timestamp = Math.floor(Date.now() / 1000);
const oauth_nonce = uuid.v1();

const parameters = {
    ...queryParameters,
    oauth_consumer_key: garmin.apiKey,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: oauth_timestamp,
    oauth_nonce: oauth_nonce,
    oauth_version: "1.0"
}

let ordered = {};
Object.keys(parameters).sort().forEach(function(key) {
    ordered[key] = parameters[key];
});

let encodedParameters = '';

for (k in ordered) {
    const encodedValue = escape(ordered[k]);
    const encodedKey = encodeURIComponent(k);

    if (encodedParameters === '') {
        encodedParameters += encodeURIComponent(`${encodedKey}=$encodedValue}`)
    } else {
        encodedParameters += encodeURIComponent(`&${encodedKey}=${encodedValue}`);
    }
}


const method = 'GET';

const base_url = 'https://connectapi.garmin.com/oauth-service/oauth/request_token';
const encodeUrl = encodeURIComponent(base_url);

encodedParameters = encodeURIComponent(encodedParameters);
const signature_base_string = `${method}&{encodedUrl}&${encodedParameters}`




const secret_key = garmin.apiSecretKey;

const signing_key = `${secret_key}&`;

const oauth_signature = crypto.createHmac("sha1", signing_key).update(signature_base_string).digest().toString('base64');


const encoded_oauth_signature = encodeURIComponent(oauth_signature);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    }).catch(e => {
        done(new Error("Failed to deserialize an user"));
    });
});


passport.use('oauth', new OAuth1Strategy({
        requestTokenURL: 'https://connectapi.garmin.com/oauth-service/oauth/request_token',
        userAuthorizationURL: 'https://connect.garmin.com/oauthConfirm',
        accessTokenURL: 'https://connectapi.garmin.com/oauth-service/oauth/access_token',
        consumerKey: garmin.apiKey,
        consumerSecret: garmin.apiSecretKey,
        callbackURL: ' http://b3173f69301b.ngrok.io/garmin/redirect',

        //'slack://slack.com/app_redirect?app=A0132K3RRHC',

    },
    (token, tokenSecret, profile, done) => {
        console.log('CAN YOU HEAR ME IN THE BACK!')
        console.log(profile);

        User.findOne({ twitterId: profile._json.id_str })
            .then((currentUser) => {
                if (currentUser) {
                    console.log(profile);
                    console.log('user is: ', currentUser);
                    done(null, currentUser);
                } else {

                    new User({

                        // garminId: profile._json.id_str,
                        // garminUsername: profile._json.name,
                        // garminDisplayName: profile._json.screen_name,
                        // garminProfileImage: profile._json.profile_image_url
                    }).save().then((newUser) => {
                        console.log('new user created: ' + newUser);
                        done(null, newUser);
                    })
                }
            }).catch((e) => console.log(e))

    }))

module.exports = signature_base_string