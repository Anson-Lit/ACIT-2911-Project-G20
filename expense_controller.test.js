const expense_controller = require('./controller/expense_controller')
const { database } = require('./database')

// afterAll(async (done) => {
//     // await prisma.user.deleteMany();
//     // await prisma.$disconnect();
//     app.close();
//     done();
// })

const req = {
    params: { 
        id : '12065a5e-8910-48eb-acd9-4e52ba380b31',
    },
    body: {
        datetime: '1',
        transaction:'test',
        cost:40
    }
};
const req2 = {
    params: {id: '100'}
}
const res = {
    render: jest.fn(),
    redirect: jest.fn()
};

const user1 = {
    email : 'test123@gmail.com',
    password: '123',
}
const user2 = { 
    email : 'user2@email.com',
    password: '2',
}
const req3 = {
    user: user1,
}
it('calls res.render expense/index, displaying expenses', () => {
    expense_controller.list(req3,res)
    expect(200)
})

it('calls res.render expense/create path', () => {
    expense_controller.new(req3,res)
    expect(res.render).toHaveBeenCalled()
})

it('calls res.render expense/single-expense path using valid id', () => {
    expense_controller.listOne(req,res)
    expect(res.render).toHaveBeenCalled()
})

it('calls res.render expense/index, displaying expenses, id:100 doesn\'t exist', () => {
    expense_controller.listOne(req2,res)
    expect(res.render).toHaveBeenCalled()
})

it ('calls res.redirect to /expenses after creating', () => {
    expense_controller.create(req,res)
})

it ('calls res.redirect to /expenses after editting', () => {
    expense_controller.edit(req,res)
    expect(res.render).toHaveBeenCalled()
})

it('calls res.redirect after deleting', () => {
    expense_controller.delete(req,res)
})

it ('calls res.redirect to /expenses after updating', () => {
    expense_controller.update(req,res)
})
