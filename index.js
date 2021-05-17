const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
app.use(express.static(path.join(__dirname, "public")));

const expenseController = require("./controller/expense_controller");
const authController = require("./controller/auth_controller");
const passport = require("./middleware/passport");
const userController = require("./controller/user_controller");
const { ensureAuthenticated, forwardAuthenticated } = require("./middleware/checkAuth")


app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(ejsLayouts);

app.set("view engine", "ejs");


app.get("/expenses", ensureAuthenticated, expenseController.list);

app.get("/expense/new", ensureAuthenticated, expenseController.new);

app.get("/expense/:id", ensureAuthenticated, expenseController.listOne);

app.get("/expense/:id/edit", ensureAuthenticated, expenseController.edit);

app.post("/expense/", ensureAuthenticated, expenseController.create);

app.post("/expense/delete/:id", ensureAuthenticated, expenseController.delete);

app.post("/expense/update/:id", ensureAuthenticated, expenseController.update);

app.get("/register", forwardAuthenticated, authController.register);
// app.get("/login", forwardAuthenticated, authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);
app.get("/logout", authController.logout)

const server = app.listen(3003, function() {
    console.log(
        "Server running. Visit: localhost:3003/"
    );
});

module.exports = server;