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



// create a new expense
it('Testing to create a new expense', async () => {
    const res = await request(app)
        .post('/expense/')
        .send(test1)
        .set('Accept', 'application/json')
        .expect(302);


});

// delete an existing expense
it( 'Testing to delete an expense', async () => {
    const res = await request(app)
        .post('/expense/delete/0')
        .set('Accept','application/json')
        .expect(302);


});

//delete a nonexistent expense
it ('Testing to delete an expense that doesn\'t exist', async ()=>{
    const res = await request(app)
        .post('/expense/delete/99999')
        .set('Accept','application/json')
        .expect(404);

        
})