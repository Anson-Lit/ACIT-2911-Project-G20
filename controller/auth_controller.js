const passport = require("../middleware/passport");
let database = require("../database");

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
    registerSubmit: (req, res) => {
        let idNum = database.database.length + 1
        console.log(idNum)
        let user = {
            expenses: [],
            id: idNum,
            email: req.body.email,
            password: req.body.password
        }
        database.database.push(user)
        res.render("auth/login")
    },
    logout: (req, res) => {
        req.logout();
        res.status(200);
        res.redirect("/login")
    }
};

module.exports = authController;