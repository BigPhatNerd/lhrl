const router = require("express").Router();
const { User } = require('../models');
const passport = require('../config/authentication');

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

router.post("/api/signup", (req, res) => {
    User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then(() => {
            res.redirect(307, "/api/login");
        })
        .catch(err => {
            res.status(401).json(err);
        });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.get("/api/user_data", (req, res) => {
    if(!req.user) {
        res.json({});
    } else {
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    }
});


module.exports = router;