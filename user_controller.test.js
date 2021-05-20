const user_controller = require('./controller/user_controller')
const prisma = require('.prisma/client');
const app = require('./index');
const request = require("supertest");
const { idText } = require('typescript');

const user1 = {
    id: '6',
    email: 'test123@gmail.com',
    password: '123',
}
const user2 = {
    email: 'user2@email.com',
    password: '2',
}
afterEach(async(done) => {
    app.close();
    done();
})

afterAll(async(done) => {
    // await prisma.user.deleteMany();
    // await prisma.$disconnect();
    app.close();
    done();
})

it('returns a user with valid credentials', async() => {
    let test_user = await user_controller.getUserByEmailIdAndPassword(user1.email, user1.password)
    expect(test_user).toBeDefined()
})

it('returns null if theres no user found', async() => {
    let test_user = await user_controller.getUserByEmailIdAndPassword(user2.email, user2.password)
    expect(test_user).toStrictEqual(null)
})

it('returns a user with valid id', async() => {
    let test_user = await user_controller.getUserById(user1.id)
    expect(test_user).toBeDefined()
})

it('returns null when given an invalid id', async() => {
    let test_user = await user_controller.getUserById('6')
    expect(test_user).toStrictEqual(null)
})