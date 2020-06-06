var passport = require('passport');
var OAuth1Strategy = require('passport-oauth1').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var UserModel = require('./models/user.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var { garmin, twitter } = require("./lib/keys");

module.exports =
    passport.use(new OAuth1Strategy({
            requestTokenURL: 'https://connectapi.garmin.com/oauth-service/oauth/request_token',
            accessTokenURL: 'https://connectapi.garmin.com/oauth-service/oauth/access_token',
            userAuthorizationURL: 'https://connect.garmin.com/oauthConfirm',
            consumerKey: garmin.apiKey,
            consumerSecret: garmin.apiSecretKey,
            callbackURL: 'http://lhrlslacktest.ngrok.io/garmin/redirect',

        },
        function(token, tokenSecret, profile, done) {
            User.findOne({ garminRequestToken: token }, function(err, user) {
                if (!err && user != null) {
                    var objectId = mongoose.Types.ObjectId;
                    User.update({ "_id": user["_id"] }, { $set: { modified: new Date() } }).exec();
                } else {
                    var user_data = new User({
                        garminRequestToken: token,
                        // provider: profile.provider,
                        // displayName: profile.first_name + ' ' + profile.last_name,
                        // name: profile.username,
                        // emails: { value: profile.email },
                        created: Date.now(),
                        modified: Date.now(),
                        oauthtoken: token
                    });
                    user_data.save(function(error) {
                        if (error) {
                            console.log('Error while saving user: ' + error);
                        } else {
                            console.log('User Saved successfully:' + profile.id);
                        }
                    });
                }
                return done(null, user);
            });
        }
    ));

passport.use(new TwitterStrategy({
        requestTokenURL: 'https://api.twitter.com/oauth/request_token',
        accessTokenURL: 'https://api.twitter.com/oauth/access_token',
        userAuthorizationURL: 'https://api.twitter.com/oauth/authorize',
        consumerKey: twitter.apiKey,
        consumerSecret: twitter.apiSecretKey,
        oauth_callback: 'http://lhrlslacktest.ngrok.io/twitter/redirect',
        //'slack://slack.com/app_redirect?app=A0132K3RRHC',
        include_email: true
    },
    function(token, tokenSecret, profile, done) {
        User.findOne({ id: profile.id }, function(err, user) {
            if (!err && user != null) {
                var objectId = mongoose.Types.ObjectId;
                User.update({ "_id": user["_id"] }, { $set: { modified: new Date() } }).exec();
            } else {
                var user_data = new User({
                    id: profile.id,
                    provider: profile.provider,
                    displayName: profile.displayName,
                    name: profile.username,
                    emails: { value: profile.email },
                    created: Date.now(),
                    modified: Date.now(),
                    oauthtoken: token
                });
                user_data.save(function(error) {
                    if (error) {
                        console.log('Error while saving user: ' + error);
                    } else {
                        console.log('User Saved successfully:' + profile.id);
                    }
                });
            }
            return done(null, user);
        });
    }
));