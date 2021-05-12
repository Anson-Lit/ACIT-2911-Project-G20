const user_controller = require('./controller/user_controller')
const prisma = require('.prisma/client');
const app = require('./index');
const request = require("supertest");
const { idText } = require('typescript');

const user1 = {
    id : '12065a5e-8910-48eb-acd9-4e52ba380b31',
    email : 'test123@gmail.com',
    password: '123',
}
const user2 = { 
    email : 'user2@email.com',
    password: '2',
}

afterAll(async (done) => {
    // await prisma.user.deleteMany();
    // await prisma.$disconnect();
    app.close();
    done();
})

it('returns a user with valid credentials', () => {
    let test_user = user_controller.getUserByEmailIdAndPassword(user1.email,user1.password)
    expect(test_user).toBeDefined()
})

it('returns null if theres no user found', () =>{
    let test_user = user_controller.getUserByEmailIdAndPassword(user2.email,user2.password)
    expect(test_user).toStrictEqual(Promise.resolve())
})

it('returns a user with valid id', () => {
    let test_user = user_controller.getUserById(user1.id)
    expect(test_user).toBeDefined()
})

it('returns null when given an invalid id', () => {
    let test_user = user_controller.getUserById('6')
    expect(test_user).toStrictEqual(Promise.resolve())
})

