const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let expenseController = {
    list: async(req, res) => {
        try {
            let theUser = await (req.user)
            console.log(theUser)
            let userId = theUser.id
            let expenses = await prisma.expenses.findMany({
                    where: { userId: userId }
                })

            let budget = theUser.budget
            let total = getTotal(expenses)
                
            res.render("expense/index", { expenses: expenses, budget: budget, total: total});
        } catch (err) {

            return res.status(500).json({ error: "An Error Occured" })
        }
    },
    

    new: (req, res) => {
        res.render("expense/create");
    },

    listOne: async(req, res) => {
        const searchResult = await prisma.expenses.findUnique({
            where: {
                id: req.params.id,
            },
        })
        res.render("expense/single-expense", { expenseItem: searchResult });

        //     let expenseToFind = req.params.id;
        //     let searchResult = req.user.expenses.find(function(expense) {
        //         return expense.id == expenseToFind;
        //     });
        //     if (searchResult != undefined) {
        //         res.render("expense/single-expense", { expenseItem: searchResult });
        //     } else {
        //         res.render("expense/index", { expenses: req.user.expenses });
        //     }
    },

    create: async(req, res) => {
        try {
            let theUser = await (req.user)
            const expense = await prisma.expenses.create({
                data: {
                    userId: theUser.id,
                    date: req.body.datetime,
                    transaction: req.body.transaction,
                    cost: req.body.cost,
                    tags: req.body.tags
                }
            })
            res.redirect("/expenses");
        } catch (err) {
            return res.status(500).json({ error: "An error occured" })
        }
        // let id_list = [];
        // for (item of req.user.expenses) {
        //     id_list.push(item.id)
        // }
        // const set = new Set(id_list);
        // let id = 1;
        // while (set.has(id)) {
        //     id++
        // }
        // let expense = {
        //     id: id,
        //     date: req.body.datetime,
        //     transaction: req.body.transaction,
        //     cost: req.body.cost
        // };
        // req.user.expenses.push(expense);
        // res.redirect("/expenses");
    },

    edit: async(req, res) => {
        const expenseToFind = await prisma.expenses.findUnique({
            where: {
                id: req.params.id,
            },
        })
        res.render("expense/edit", { expenseItem: expenseToFind });


        // let expenseToFind = req.params.id;
        // let searchResult = req.user.expenses.find(function(expenses) {
        //     return expenses.id == expenseToFind;
        // });
        // res.render("expense/edit", { expenseItem: searchResult });
    },
    delete: async(req, res) => {
        const deleteExpense = await prisma.expenses.delete({
            where: { id: req.params.id }
        })
        res.redirect("/expenses")


        // let findId = req.params.id
        // let indexNum = req.user.expenses.findIndex(i => i.id == findId)
        // req.user.expenses.splice(indexNum, 1)
        // res.redirect("/expenses")
    },

    update: async(req, res) => {
        let { datetime, transaction, cost, tags } = req.body;
        const updateExpense = await prisma.expenses.update({
            where: {
                id: req.params.id,
            },
            data: {
                date: datetime,
                transaction: transaction,
                cost: cost,
                tags: tags
            },
        })
        res.redirect("/expenses");
        // let reminderToUpdate = req.params.id;
        // let { datetime, transaction, cost } = req.body;
        // for (var r in req.user.expenses) {
        //     if (req.user.expenses[r].id.toString() === reminderToUpdate) {
        //         req.user.expenses[r].transaction = transaction;
        //         req.user.expenses[r].cost = cost;
        //         req.user.expenses[r].date = datetime;
        //         break;
        //     }
        // }
        // res.redirect("/expenses");
    },

};

const getTotal = (expenses) =>{
    let total = 0
    expenses.forEach((expense)=>{
        total = total + parseInt(expense.cost)
    })
    return total
}

module.exports = expenseController;