var path = require("path");

const isAuthenticated = require("../config/middleware/isAuthenticated");

// module.exports = function(app) {
        //     app.get("/", (req, res) => {
        //         if(req.user) {
        //             res.redirect("/members");
        //         }
        //         res.sendFile(path.join(__dirname, "../public/views/signup.html"));
        //     });

        //     app.get("/login", (req, res) => {
        //         if(req.user) {
        //             res.redirect("/members");
        //         }
        //         res.sendFile(path.join(__dirname, "../public/views/login.html"));
        //     });

        //     app.get("/members", isAuthenticated, (req, res) => {
        //         res.sendFile(path.join(__dirname, "../public/views/members.html"));
        //     });
        // };