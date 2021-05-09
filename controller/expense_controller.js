// const { prisma } = require(".prisma/client");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { testperson1 } = require("../database");
let database = require("../database").database;

let expenseController = {
    list: async(req, res) => {
        res.render("expense/index", { expenses: req.user.expenses });
    },

    new: (req, res) => {
        res.render("expense/create");
    },

    listOne: (req, res) => {
        let expenseToFind = req.params.id;
        let searchResult = req.user.expenses.find(function(expense) {
            return expense.id == expenseToFind;
        });
        if (searchResult != undefined) {
            res.render("expense/single-expense", { expenseItem: searchResult });
        } else {
            res.render("expense/index", { expenses: req.user.expenses });
        }
    },

    create: async(req, res) => {

        let id_list = [];
        for (item of req.user.expenses) {
            id_list.push(item.id)
        }
        const set = new Set(id_list);
        let id = 1;
        while (set.has(id)) {
            id++
        }

        let expense = {
            id: id,
            date: req.body.datetime,
            transaction: req.body.transaction,
            cost: req.body.cost
        };
        req.user.expenses.push(expense);
        res.redirect("/expenses");
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = req.user.expenses.find(function(expenses) {
            return expenses.id == reminderToFind;
        });
        res.render("expense/edit", { expenseItem: searchResult });
    },
    delete: (req, res) => {
        let findId = req.params.id
        let indexNum = req.user.expenses.findIndex(i => i.id == findId)
        req.user.expenses.splice(indexNum, 1)
        res.redirect("/expenses")
    },

    update: (req, res) => {
        let reminderToUpdate = req.params.id;
        let { datetime, transaction, cost } = req.body;
        for (var r in req.user.expenses) {
            if (req.user.expenses[r].id.toString() === reminderToUpdate) {
                req.user.expenses[r].transaction = transaction;
                req.user.expenses[r].cost = cost;
                req.user.expenses[r].date = datetime;
                break;
            }
        }
        res.redirect("/expenses");
    }

};

module.exports = expenseController;