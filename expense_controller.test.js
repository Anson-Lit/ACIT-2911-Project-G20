const expense_controller = require('./controller/expense_controller')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const request = require('supertest');
const server = require('./index');


beforeAll((done) => {
    done();
})
afterEach(async(done) => {
    server.close();
    done();
})
afterAll(async(done) => {
    // await prisma.user.deleteMany();
    // await prisma.$disconnect();
    // await prisma.expenses.deleteMany();
    // await prisma.$disconnect();
    server.close();
    done();
})

afterEach(async(done) => {
    server.close();
    done();
})


jest.mock('request', () => ({
    post: jest.fn(),
}));

const req = {
    user: { id: '082cbf6d-b6cd-40dd-bade-891d89ce8611' },
    params: {
        id: '082cbf6d-b6cd-40dd-bade-891d89ce8611',
    },
    body: {
        id: "509fd75e-246e-4473-a04a-6d046e54217f",
        datetime: '1',
        transaction: 'apple',
        cost: "40",
        tags: "Food",
        userId: "082cbf6d-b6cd-40dd-bade-891d89ce8611"
    }
};

const returnVal = {
    body: {
        id: "509fd75e-246e-4473-a04a-6d046e54217f",
        date: '1',
        transaction: 'apple',
        cost: "40",
        tags: "Food",
        userId: "082cbf6d-b6cd-40dd-bade-891d89ce8611"
    }
}
const req2 = {
    params: { id: '100' }
}
const res = {
    render: jest.fn(),
    redirect: jest.fn(),
    status: jest.fn(),
    json: jest.fn()
};

const user1 = {
    email: 'test123@gmail.com',
    password: '1',
    id: '082cbf6d-b6cd-40dd-bade-891d89ce8611',

}
const user2 = {
    email: 'user2@email.com',
    password: '2',
}
const req3 = {
    user: user1,
    session: {
        user: '082cbf6d-b6cd-40dd-bade-891d89ce8611'
    },
}

const req4 = {
    user: user1,
    session: {
        user: '082cbf6d-b6cd-40dd-bade-891d89ce8611'
    },
    req
}


const exp1 = {
    userId: "6bce5853-8947-43f1-b365-665d2db8fcce",
    datetime: "2021-05-01",
    cost: "15",
    transaction: "Bought a sandwich",
    tags: "food"

}


it('creates an expense', async() => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), redirect: jest.fn().mockReturnThis() };
    await expense_controller.create(req, res);
    expect(await prisma.expenses.findUnique({
        where: {
            id: req.body.id
        },
    })).toEqual(
        returnVal.body,
    );
});


it('calls res.render expense/index, displaying expenses', async() => {
    await expense_controller.list(req3, res)
    expect(res.render).toHaveBeenCalled()
})

it('calls res.render expense/create path', async() => {
    await expense_controller.new(req3, res)
    expect(res.render).toHaveBeenCalled()
})

it('calls res.render expense/single-expense path using valid id', async() => {
    await expense_controller.listOne(req, res)
    expect(res.render).toHaveBeenCalled()
})

it('calls res.render expense/index, displaying expenses, id:100 doesn\'t exist', async() => {
    await expense_controller.listOne(req2, res)
    expect(res.render).toHaveBeenCalled()
})

it('calls res.redirect to /expenses after editting', async() => {
    await expense_controller.edit(req, res)
    expect(res.render).toHaveBeenCalled()
})