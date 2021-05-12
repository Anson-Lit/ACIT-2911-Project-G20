const auth_controller = require('./controller/auth_controller');
const request = require('supertest');
const prisma = require('.prisma/client');
const app = require('./index');


beforeAll((done)=>{
    done();
});

afterAll(async (done) => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    app.close();
    done();
})


const req = {
    params: { 
        id : 1,
    },
    body: {
        datetime: '1',
        transaction:'test',
        cost:40
    },
    logout: jest.fn()
};
const req2 = {
    params: {id: 100}
}
const res = {
    render: jest.fn(),
    redirect: jest.fn(),
    status:jest.fn()
};

const user1 = {
    email : 'test123@gmail.com',
    password: '123',
}
const user2 = { 
    email : 'user2@email.com',
    password: '2',
}

const users = [user1,user2]


it('renders login page when not signed in', () => {
    auth_controller.login(req,res)
    expect(res.render).toHaveBeenCalledWith('auth/login',{ loggedIn: false })
})

it('renders register page when not signed in', () => {
    auth_controller.register(req,res)
    expect(res.render).toHaveBeenCalledWith('auth/register', {loggedIn:false})
})

it('redirects to login page when logging out', () => {
    auth_controller.logout(req,res)
    expect(res.status).toBeDefined()
    expect(res.redirect).toHaveBeenCalledWith('/login')
})


it('renders the expense main page when login successful', ()=> {
    const response = await request(app)
        .post('/login')
        .send(user1)
        .set('Accept','application/json')
        .expect(200);
        expect(res.render).toHaveBeenCalledWith('/expenses')
})

it('renders the login page again when login unsuccessful', () => {
    const response = await request(app)
        .post('/login')
        .send(user2)
        .set('Accept','application/json')
        .expect(200);
        expect(res.render).toHaveBeenCalledWith('/login')
})

it('does not register a new user if the email already exists', async () => {
    const response = await request(app)
        .post('/register')
        .send(user1)
        .set('Accept','application/json')
        expect(res.render).toHaveBeenCalledWith('auth/register')
})

it('registers a new user into the DB, then redirects to correct page', async () => {
    const response = await request(app)
        .post('/register')
        .send(user2)
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200);
        expect(res.render).toHaveBeenCalledWith('auth/login')
        expect(response.body.id).toBeDefined()
})



