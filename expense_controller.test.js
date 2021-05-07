const controller = require('./controller/expense_controller')
const { database } = require('./database')

const req = {
    params: { 
        id : 1,
    },
    body: {
        datetime: '1',
        transaction:'test',
        cost:40
    }
};
const req2 = {
    params: {id: 100}
}
const res = {
    render: jest.fn(),
    redirect: jest.fn()
};

it('calls res.render expense/index, displaying expenses', () => {
    controller.list(req,res)
    expect(res.render).toHaveBeenCalledWith('expense/index',{ expenses : database[0].expenses })
})

it('calls res.render expense/create path', () => {
    controller.new(req,res)
    expect(res.render).toHaveBeenCalledWith('expense/create')
})

it('calls res.render expense/single-expense path using id:1', () => {
    controller.listOne(req,res)
    expect(res.render).toHaveBeenCalledWith('expense/single-expense', { expenseItem: database[0].expenses[0]})
})

it('calls res.render expense/index, displaying expenses, id:100 doesn\'t exist', () => {
    controller.listOne(req2,res)
    expect(res.render).toHaveBeenCalledWith('expense/index',{ expenses : database[0].expenses })
})

it ('calls res.redirect to /expenses after creating', () => {
    controller.create(req,res)
    expect(res.redirect).toHaveBeenCalledWith('/expenses')
})

it ('calls res.redirect to /expenses after editting', () => {
    controller.edit(req,res)
    expect(res.redirect).toHaveBeenCalledWith('/expenses')
})

it ('calls res.redirect to /expenses after updating', () => {
    controller.update(req,res)
    expect(res.redirect).toHaveBeenCalledWith('/expenses')
})
