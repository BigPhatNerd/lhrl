var passport = require('passport');
var util = require('util');
var BearerStrategy = require('passport-http-bearer').Strategy;
var StravaStrategy = require('passport-strava').Strategy;
var UserModel = require('../models/');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var { strava } = require("../lib/keys");



passport.use(new StravaStrategy({
        authorizationURL: 'https://www.strava.com/oauth/authorize',
        tokenURL: 'https://www.strava.com/oauth/token',
        clientID: strava.clientId,
        clientSecret: strava.clientSecret,
        callbackURL: 'http://lhrlslacktest.ngrok.io/strava/redirect'

    },
    function(accessToken, refreshToken, profile, done) {
        console.log("Strava profile, looking for scope: ", profile);
        User.findOne({ stravaId: profile.id }, function(err, user) {

            if(!err && user != null) {

                User.update({ "_id": user["_id"] }, {
                    $set: {
                        modified: new Date(),
                        stravaAccessToken: accessToken,
                        stravaRefreshToken: refreshToken,
                        stravaId: profile.id,
                        provider: profile.provider,
                        displayName: profile.displayName,
                        name: profile.name.first + " " + profile.name.last,
                        stravaAvatar: profile.avatar,
                        emails: { value: profile.email },
                        created: Date.now(),
                        expires_at: Date.now() + 261600
                    }
                }).exec();
                console.log("\n\nUser updated?: ", user);
                console.log("\n\nStrava ID: ", profile.id);
                console.log("\n\nStrava access token: ", accessToken);
                console.log("\n\nStrava refresh token: ", refreshToken);
            }
            //Should not ever get here if initial slack user creation works correctly
            else {
                user = new User({
                    stravaId: profile.id,
                    provider: profile.provider,
                    displayName: profile.displayName,
                    name: profile.name.first + " " + profile.name.last,
                    stravaAvatar: profile.avatar,
                    emails: { value: profile.email },
                    created: Date.now(),
                    modified: Date.now(),
                    stravaAccessToken: accessToken,
                    stravaRefreshToken: refreshToken,
                    expires_at: Date.now() + 261600
                });
            }

            user.save(function(error) {
                if(error) {
                    console.log('Error while saving user: ' + error);
                } else {
                    console.log('User Saved successfully:' + profile.id);
                }
            });


            return done(null, user);
        })

    }));

passport.use(new BearerStrategy(
    function(token, done) {
        User.findOne({ stravaAccessToken: token }, function(err, user) {
            if(err) { return done(err); }
            if(!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
    done(null, id);
});

module.exports = passport;



//