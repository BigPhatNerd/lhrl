var passport = require('passport');
var bcrypt = require('bcrypt');
var util = require('util');
var LocalStrategy = require("passport-local");
var StravaStrategy = require('passport-strava').Strategy;
var db = require('../models/');
var mongoose = require('mongoose');
// var User = mongoose.model('User');
const { User, Session } = require('../models');

var { strava } = require("../lib/keys");



//Telling passport we want to use a Local Strategy aka login with an email and password
passport.use(new LocalStrategy(
    //Our user will sign in using an email, rather than a "username"
    {
        usernameField: "email",
        passwordField: "password"
    },
    async function(email, password, done) {
        console.log("WHATTTT");
        User.findOne({
                email: email
            }).then(user => {
                if(!user) {
                    return done(null, false, { message: "No user found!" })
                } else {
                    user.validPassword(password)
                        .then(isValid => {
                            console.log("\n\nisValid: ", isValid);
                            if(!isValid) {
                                console.log("I guess it returned!");
                                return done(null, false, { message: "Wrong password!" });

                            } else {

                                return done(null, user);
                            };
                        });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    }));

passport.use(new StravaStrategy({
        authorizationURL: 'https://www.strava.com/oauth/authorize',
        tokenURL: 'https://www.strava.com/oauth/token',
        clientID: strava.clientId,
        clientSecret: strava.clientSecret,
        callbackURL: 'http://lhrlslacktest.ngrok.io/strava/redirect',
        passReqToCallback: true

    },
    async function(req, accessToken, refreshToken, profile, done) {

        try {
            const searchUser = await Session.find({});
            console.log("\n\n\nsearchUser: ", searchUser);
            console.log("\n\n\nsearchUser.data: ", searchUser[0]);
            User.findOne({ "user_id": searchUser[0].userId }, function(err, user) {

                if(!err && user != null) {
                    console.log("About to update user, I do believe.");
                    User.update({ "user_id": searchUser[0].userId }, {
                        $set: {
                            modified: new Date(),
                            stravaAccessToken: accessToken,
                            stravaRefreshToken: refreshToken,
                            stravaId: profile.id,
                            provider: profile.provider,
                            displayName: profile.displayName,
                            name: profile.name.first + " " + profile.name.last,
                            stravaAvatar: profile.avatar,
                            created: Date.now(),
                            expires_at: Date.now() + 261600,
                            authorizeStrava: true
                        }
                    }).exec();

                }
                //Should not ever get here if initial slack user creation works correctly
                else {
                    console.log("I should not be here!!!!! \n User should have been created in local passport strategy. \n Currently in else of passport");
                    console.log("req.user in the else of passport: ", req.user);
                }

                return done(null, user);
            })

        } catch (err) {

            console.error(err.message);

        }
    }));



passport.serializeUser(function(user, done) {

    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;



//