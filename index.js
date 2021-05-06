const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const expenseController = require("./controller/expense_controller");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");


app.get("/expenses", expenseController.list);

app.get("/expense/new", expenseController.new);

app.get("/expense/:id", expenseController.listOne);

app.get("/expense/:id/edit", expenseController.edit);

app.post("/expense/", expenseController.create);

app.post("/expense/delete/:id", expenseController.delete);

app.listen(3003, function() {
    console.log(
        "Server running. Visit: localhost:3003/expenses "
    );
});