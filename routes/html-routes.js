var path = require("path");
const router = require('express').Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", (req, res) => {
    if(req.user) {
        res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/views/signup.html"));
});

router.get("/login", (req, res) => {
    if(req.user) {
        res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/views/login.html"));
});

router.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/members.html"));
})

module.exports = router;