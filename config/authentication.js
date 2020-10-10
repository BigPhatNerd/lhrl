var passport = require('passport');
var util = require('util');
var LocalStrategy = require("passport-local");
var StravaStrategy = require('passport-strava').Strategy;
var UserModel = require('../models/');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var { strava } = require("../lib/keys");
//Telling passport we want to use a Local Strategy aka login with an email and password
passport.use(new LocalStrategy(
    //Our user will sign in using an email, rather than a "username"
    {
        usernameField: "email"
    },
    function(email, password, done) {
        User.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser) {
            if(!dbUser) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            } else if(!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, dbUser);
        });
    }
));

passport.use(new StravaStrategy({
        authorizationURL: 'https://www.strava.com/oauth/authorize',
        tokenURL: 'https://www.strava.com/oauth/token',
        clientID: strava.clientId,
        clientSecret: strava.clientSecret,
        callbackURL: 'http://lhrlslacktest.ngrok.io/strava/redirect',
        passReqToCallback: true

    },
    function(req, accessToken, refreshToken, profile, done) {
        console.log("\nIs there a req here?: ", req.user);


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
                        created: Date.now(),
                        expires_at: Date.now() + 261600
                    }
                }).exec();

            }
            //Should not ever get here if initial slack user creation works correctly
            else {
                console.log("req.user in the else of passport: ", req.user);
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



passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
    // done(null, id);
    const user = await User.findOne({ id }, done)
    console.log("User in deserializeUser: ", user)

});

module.exports = passport;



//