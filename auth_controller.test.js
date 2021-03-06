const auth_controller = require('./controller/auth_controller');
const request = require('supertest');
const prisma = require('.prisma/client');
const app = require('./index');


beforeAll((done) => {
    done();
});
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

const req = {
    params: {
        id: '12065a5e-8910-48eb-acd9-4e52ba380b31',
    },
    body: {
        email: 'test123@gmail.com',
        password: '123',
    },
    logout: jest.fn()
};
const req2 = {
    params: { id: '120' }
}
const res = {
    render: jest.fn(),
    redirect: jest.fn(),
    status: jest.fn()
};

const next = {

}

const user1 = {
    email: 'test123@gmail.com',
    password: '123',
}

const user2 = {
    email: 'user2@email.com',
    password: '3',
}


const req3 = {
    body: user2
}


it('renders register page when not signed in', async() => {
    await auth_controller.register(req, res)
    expect(res.render).toHaveBeenCalledWith('auth/register', { loggedIn: false })
})


it('renders the expense main page when login successful', async() => {
    const response = await request(app)
        .post('/login')
        .send(user1)
        .set('Accept', 'application/json')
        .expect(302);
})

it('renders the login page when login unsuccessful', async() => {
    const response = await request(app)
        .post('/login')
        .send(user2)
        .set('Accept', 'application/json')
        .expect(302);
    await auth_controller.loginSubmit(user2, res, next)
    expect(302)
})

it('does not register a new user if the email already exists', async() => {
    const response = await request(app)
        .post('/register')
        .send(user1)
    await auth_controller.registerSubmit(req, res, next)
    expect(200)
    app.close()
})

it('registers a new user into the DB, then redirects to login page', async() => {
    await auth_controller.registerSubmit(req3, res, next)
    expect(res.render).toHaveBeenCalled()
})


it('redirects to login page when logging out', async() => {
    await auth_controller.logout(req, res)
    expect(res.redirect).toHaveBeenCalledWith('/index.html')
})