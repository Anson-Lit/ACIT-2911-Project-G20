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


module.exports = {
    getUserByEmailIdAndPassword,
    getUserById,
};