const router = require("express").Router();
var mongoose = require('mongoose');
const { User } = require('../models');
const passport = require('../config/authentication');

module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    app.post("/api/signup", (req, res) => {
        console.log("made it here")
        const { stravaId, username, email, password, isAuthenticated } = req.body;

        User.create({ stravaId: stravaId, username: username, email: email, password: password, isAuthenticated: isAuthenticated })
            .then(user => {
                console.log("user: ", user);
                res.redirect(307, "/api/login");
            })
            .catch(err => {
                console.error(err.message);
                res.status(401).json(err);
            })

    });


    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", (req, res) => {

        if(!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            res.json({
                // Otherwise send back the user's email and id
                // Sending back a password, even a hashed password, isn't a good idea
                stravaId: req.user.stravaId,
                email: req.user.email,
                id: req.user.id
            });
        }
    });

}





//