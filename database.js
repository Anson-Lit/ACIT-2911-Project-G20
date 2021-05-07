let database = [{
    expenses: [{ id: 1, date: "2021-05-03", transaction: "Bought an apple", cost: 5 }],
    id: 1,
    name: "John Doe",
    email: "John@gmail.com",
    password: "j",
}]

const userModel = {
    findOne: (email) => {
        for (const person of database) {
            if (person.email === email) {
                return person
            }
        }
        //TODO: redirect user to registration if user not found
        throw new Error(`Couldn't find user with email: ${email}`)
    },
    findById: (id) => {
        for (const person of database) {
            if (person.id === id) {
                return person
            }
        }
        if (user) {
            return user;
        }
        //TODO: same thing as findOne
        throw new Error(`Couldn't find user with id: ${id}`);
    },
};

module.exports = { database, userModel };