const { twitter } = require('../lib/keys');
const User = require('../models')
var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use('twitter', new TwitterStrategy({
        requestTokenURL: 'https://api.twitter.com/oauth/request_token',
        accessTokenURL: 'https://api.twitter.com/oauth/access_token',
        userAuthorizationURL: 'https://api.twitter.com/oauth/authorize',
        consumerKey: twitter.apiKey,
        consumerSecret: twitter.apiSecretKey,
        callbackURL: 'http://982bd44f.ngrok.io/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
        User.findOne({ twitterId: profile.id })
            .then((currentUser) => {
                if (currentUser) {
                    console.log('user is: ', currentUser);
                    done(null, currentUser);
                } else {
                    new User({
                        username: profile.name,
                        twitterId: profile.id_str
                    }).save().then((newUser) => {
                        console.log('new user created: ' + newUser);
                        done(null, newUser);
                    })
                }
            })

    }))