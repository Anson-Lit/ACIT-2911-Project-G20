//unit tests for CRUD functionality

// requiring the app
const app = require('./index');
const request = require('supertest');

// beforeAll((done) => {
//     done();
// });

afterAll( async (done) => {
    app.close();
    done();
});


const user1 = {
    name: "test",
    email: "test@email.com"
}
const test1 = {
    transaction: 'TEST TRANSACTION',
    cost: 40
}



// successfully create a new expense
it('Testing to create a new expense', async () => {
    const res = await request(app)
        .post('/expense/')
        .send(test1)
        .set('Accept', 'application/json')
        //.expect('Content-Type', /json/)
        //.expect(200);

        //the database should give the expense an id and date automatically
        expect(res.body.id).toBeDefined()
        expect(res.body.date).toBeDefined()
});