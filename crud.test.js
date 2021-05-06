//unit tests for CRUD functionality

// requiring the app
const app = require('./index');
const request = require('supertest');
const { getMaxListeners } = require('./index');

// beforeAll((done) => {
//     done();
// });

afterAll( async (done) => {
    app.close();
    done();
});


const user1 = { //actual user 
    email: "John@gmail.com",
    password: "j"
}
const user2 = { //not a real user
    email: "email@email.com",
    password:"123"
}
const test1 = {
    transaction: 'TEST TRANSACTION',
    cost: 40
}


// ~~~ TESTING USER LOG IN FUNCTIONALITY ~~~

//log in user using credentials
it ('lets us log in', async ()=> {
    const response = await request(app)
        .post('/login')
        .send(user1)
        .set('Accept','application/json')
        //.expect('Content-Type',/json/)
        .expect(302)
        expect(response.redirect).toBeTruthy()


})


it ('does not allow login when nonexistent user', async() =>{
    const response = await request(app)
        .post('/login')
        .send(user2)
        .set('Accept','application/json')
        //.expect(400)
        //console.log(response)
        console.log(response)
        expect(response.redirect).toBeTruthy()


})





// ~~~ testing expense instance functionality ~~~

// GETs list of expenses
it ('returns list of expenses', async () => {
    const response = await request(app)
        .get('/expenses')
        .set('Accept','application/json')
        .expect(302)
        expect(response.redirect).toBeTruthy()
})




// create a new expense
it('Testing to create a new expense', async () => {
    const response = await request(app)
        .post('/expense/')
        .send(test1)
        .set('Accept', 'application/json')
        .expect(302);


});

// delete an existing expense
it( 'Testing to delete an expense', async () => {
    const response = await request(app)
        .post('/expense/delete/0')
        .set('Accept','application/json')
        .expect(302);


});

//delete a nonexistent expense
it ('Testing to delete an expense that doesn\'t exist', async ()=>{
    const response = await request(app)
        .post('/expense/delete/99999')
        .set('Accept','application/json')
        .expect(302);



})

