const { twitter } = require('../lib/keys');
var User = require('../models/User')
var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;

console.log('here');
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

passport.use('twitter', new TwitterStrategy({
        requestTokenURL: 'https://api.twitter.com/oauth/request_token',
        accessTokenURL: 'https://api.twitter.com/oauth/access_token',
        userAuthorizationURL: 'https://api.twitter.com/oauth/authorize',
        consumerKey: twitter.apiKey,
        consumerSecret: twitter.apiSecretKey,
        callbackURL: ' http://982bd44f.ngrok.io/twitter/redirect',
        //'slack://slack.com/app_redirect?app=A0132K3RRHC',
        include_email: true
    },
    (token, tokenSecret, profile, done) => {
        // console.log('CAN YOU HEAR ME IN THE BACK!')


        User.findOne({ twitterId: profile._json.id_str })
            .then((currentUser) => {
                if (currentUser) {
                    console.log(profile);
                    console.log('user is: ', currentUser);
                    done(null, currentUser);
                } else {

                    new User({

                        twitterId: profile._json.id_str,
                        twitterUsername: profile._json.name,
                        twitterDisplayName: profile._json.screen_name,
                        twitterProfileImage: profile._json.profile_image_url
                    }).save().then((newUser) => {
                        console.log('new user created: ' + newUser);
                        done(null, newUser);
                    })
                }
            }).catch((e) => console.log(e))

    }))