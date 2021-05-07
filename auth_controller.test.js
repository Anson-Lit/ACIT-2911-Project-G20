const controller = require('./controller/auth_controller')

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

it('renders login page when not signed in', () => {
    controller.login(req,res)
    expect(res.render).toHaveBeenCalledWith('auth/login',{ loggedIn: false })
})

it('renders register page when not signed in', () => {
    controller.register(req,res)
    expect(res.render).toHaveBeenCalledWith('auth/register', {loggedIn:false})
})

it('redirects to login page when logging out', () => {
    controller.logout(req,res)
    expect(res.status).toBeDefined()
    expect(res.redirect).toHaveBeenCalledWith('/login')
})