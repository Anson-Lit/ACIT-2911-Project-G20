const passport = require("../middleware/passport");

let authController = {
    login: (req, res) => {
        res.status(200);
        res.render("auth/login", { loggedIn: false });
    },

    register: (req, res) => {
        res.status(200);
        res.render("auth/register", { loggedIn: false });
    },

    loginSubmit: (req, res, next) => {
        passport.authenticate("local", {
            successRedirect: "/expenses",
            failureRedirect: "/login",
        })(req, res, next);
    },
    logout: (req, res) => {
        req.logout();
        res.status(200);
        res.redirect("/login")
    }
};

module.exports = authController;