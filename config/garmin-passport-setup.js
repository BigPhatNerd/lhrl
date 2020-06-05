const uuid = require('uuid');
const crypto = require('crypto');

const { garmin } = require('../lib/keys');
var User = require('../models/User')
var passport = require('passport'),
    OAuth1Strategy = require('passport-oauth').OAuthStrategy;


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
        accessTokenURL: 'https://connectapi.garmin.com/oauth-service/oauth/access_token',
        userAuthorizationURL: 'https://connect.garmin.com/oauthConfirm',
        consumerKey: garmin.apiKey,
        consumerSecret: garmin.apiSecretKey,
        callbackURL: ' http://b3173f69301b.ngrok.io/garmin/redirect',

        //'slack://slack.com/app_redirect?app=A0132K3RRHC',

    },
    (token, tokenSecret, profile, done) => {

        User.findOne({ garminRequestToken: token })
            .then((currentUser) => {
                if (currentUser) {
                    console.log('user is: ', currentUser);
                    done(null, currentUser);
                } else {

                    new User({
                        garminRequestToken: token
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