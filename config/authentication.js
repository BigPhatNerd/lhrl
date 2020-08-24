var passport = require('passport');
var util = require('util');

var StravaStrategy = require('passport-strava').Strategy;
var UserModel = require('../models/');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var { garmin, twitter, strava } = require("../lib/keys");

module.exports =
    passport.use(new StravaStrategy({
            clientID: strava.clientId,
            clientSecret: strava.clientSecret,
            callbackURL: 'http://lhrlslacktest.ngrok.io/strava/redirect'

        },
        function(accessToken, refreshToken, profile, done) {
            console.log("ACESS TOKEN: " + accessToken);
            console.log("REFRESH TOKEN: " + refreshToken);
            console.log("PROFILE: " + profile);
            console.log("DONE: " + done);

            User.findOne({ stravaId: profile.id }, function(err, user) {
                console.log('Made it here');
                if (!err && user != null) {
                    var objectId = mongoose.Types.ObjectId;
                    User.update({ "_id": user["_id"] }, { $set: { modified: new Date(), stravaAccessToken: accessToken } }).exec();
                    console.log("User: " + user);
                } else {
                    var user_data = new User({
                        stravaId: profile.id,
                        provider: profile.provider,
                        displayName: profile.displayName,
                        name: profile.name.first + " " + profile.name.last,
                        stravaAvatar: profile.avatar,
                        emails: { value: profile.email },
                        created: Date.now(),
                        modified: Date.now(),
                        stravaAccessToken: accessToken
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
        }));







//