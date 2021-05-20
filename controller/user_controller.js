const userModel = require("../database").userModel;
const dataModel = require("../database").database;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getUserByEmailIdAndPassword = async(email, password) => {

    //This is using SQlite
    let user = await prisma.user.findFirst({
        where: {
            email: email,
            password: password
        }
    });
    if (user) {
        if (isUserValid(user, password)) {
            return user
        }
    }
    return null
};
const getUserById = async(id) => {
    // let user = userModel.findById(id);
    let user = await prisma.user.findUnique({
        where: { id: id }
    })
    if (user) {
        return user;
    }
    return null;
};

function isUserValid(user, password) {
    return user.password === password;
}

const updateBudget = async(req, res) => {
    const budget = req.body
        // console.log(budget)
        // console.log(req.session)

    const user = await prisma.user.update({
            where: {
                id: req.session.passport.user,
            },
            data: {
                budget: parseInt(budget.amount)
            },
        })
        // console.log(user)
    res.redirect("/expenses");
}


module.exports = {
    getUserByEmailIdAndPassword,
    getUserById,
    updateBudget,
};