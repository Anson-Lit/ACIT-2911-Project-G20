const passport = require("../middleware/passport");
let database = require("../database");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
    registerSubmit: async(req, res) => {
        //Using Sqlite

        const { email, password } = req.body
        try {
            const user = await prisma.user.create({
                data: { email, password }
            });
            console.log(user)
            res.render("auth/login")
        } catch (err) {
            //Errors out if the email entered is the same as one in the database.
            res.render("auth/register")
        }

        //This is using a fake database
        // let idNum = database.database.length + 1
        // let user = {
        //     expenses: [],
        //     id: idNum,
        //     email: req.body.email,
        //     password: req.body.password
        // }
        // database.database.push(user)
        // res.render("auth/login")
    },
    logout: (req, res) => {
        req.logout();
        res.status(200);
        res.redirect("/login")
    }
};

module.exports = authController;