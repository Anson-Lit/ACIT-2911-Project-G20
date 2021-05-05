let database = require("../database");

let expenseController = {
    list: (req, res) => {
        res.render("expense/index", { expenses: database.testperson1.expenses });
    },

    new: (req, res) => {
        res.render("expense/create");
    },

    listOne: (req, res) => {
        let expenseToFind = req.params.id;
        let searchResult = database.testperson1.expenses.find(function(expense) {
            return expense.id == expenseToFind;
        });
        if (searchResult != undefined) {
            res.render("expense/single-reminder", { expenseItem: searchResult });
        } else {
            res.render("expense/index", { expenses: database.testperson1.expenses });
        }
    },

    create: (req, res) => {
        let nextId = database.testperson1.expenses[database.testperson1.expenses.length - 1].id
        let expense = {
            id: nextId + 1,
            date: req.body.datetime,
            transaction: req.body.transaction,
        };
        database.testperson1.expenses.push(expense);
        res.redirect("/expenses");
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = database.testperson1.expenses.find(function(reminder) {
            return reminder.id == reminderToFind;
        });
        res.render("expense/edit", { expenseItem: searchResult });
    },
};

module.exports = expenseController;