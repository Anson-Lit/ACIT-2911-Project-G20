const { testperson1 } = require("../database");
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
            res.render("expense/single-expense", { expenseItem: searchResult });
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
            price: req.body.price
        };
        database.testperson1.expenses.push(expense);
        res.redirect("/expenses");
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = database.testperson1.expenses.find(function(expenses) {
            return expenses.id == reminderToFind;
        });
        res.render("expense/edit", { expenseItem: searchResult });
    },
    delete: (req, res) => {
        let findId = req.params.id
        let indexNum = testperson1.expenses.findIndex(i => i.id == findId)
        testperson1.expenses.splice(indexNum, 1)
        res.redirect("/expenses")
    },

    update: (req, res) => {
        let reminderToUpdate = req.params.id;
        let { datetime, transaction, price } = req.body;
        for (var r in testperson1.expenses) {
            if (testperson1.expenses[r].id.toString() === reminderToUpdate) {
                testperson1.expenses[r].transaction = transaction;
                testperson1.expenses[r].price = price;
                testperson1.expenses[r].date = datetime;
                break;
            }
        }
        res.redirect("/expenses");
    }

};

module.exports = expenseController;