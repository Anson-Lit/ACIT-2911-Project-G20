//unit tests for CRUD functionality

// requiring the app
const app = require('./index');
const request = require('supertest');

beforeAll((done) => {
    done();
});

afterAll( async (done) => {
    app.close();
    done();
});


const test1 = {
    name: "test",
    email: "test@email.com",
    transaction: "test transaction",
    price: 40
}



it('Testing jest', () => {
    expect(1).toBe(1)
})


// successfully create a new user that doesnt already exist
it('Testing to create a new nonexistent user', async () => {
    const res = await request(app)
        .post('/expense')
        .send(test1)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

        //the database should give the user an id and date automatically
        expect(res.body.id).toBeDefined()
        expect(res.body.date).toBeDefined()
});