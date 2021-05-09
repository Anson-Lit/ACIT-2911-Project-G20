//unit tests for CRUD functionality

// requiring the app
const app = require('./index');
const request = require('supertest');
const db = require('./database');


// beforeAll((done) => {
//     done();
// });

afterAll( async (done) => {
    app.close();
    done();
});


const user1 = { //actual user 
    email: db.database[0].email,
    password: db.database[0].password,
}
const user2 = { //not a real user
    email: "email@email.com",
    password:"123"
}
const test1 = {
    transaction: 'TEST TRANSACTION',
    cost: 40
}

// ~~~ TESTING the database ~~~
it('returns the user in the database when given a valid email', () =>{
    let user = db.userModel.findOne(user1.email)
    expect(user.name).toEqual('John Doe')
})


it('throws an error if you try to find a nonexistent email', () => {
    expect( () => {
        let user = db.userModel.findOne(user2.email)
    }).toThrowError()
})


it('returns the user in the database when given the id', () => {
    let user = db.userModel.findById(1)
    expect(user.name).toEqual('John Doe')
})


it('throws an error if you try to use a nonexistent id', () =>{
    expect(()=>{
        let user = db.userModel.findById(2)
    }).toThrowError() 
})


// ~~~ TESTING index ROUTES ~~~
// gets login page, should return status code 200 OK
it ('lets us access the login form', async () => {
    const response = await request(app)
        .get('/login')
        .expect('Content-Type','text/html; charset=utf-8')
        expect(response.redirect).toBeFalsy()
})


// NOT YET IMPLEMENTED
// gets register page, should return status code 200 OK
it ('lets us access the register form', async () => {
    const response = await request(app)
        .get('/register')
        .expect(500)
        expect(response.redirect).toBeFalsy()
})


// does not allow access to /expenses until logged in 
it ('prevents us from accessing expenses', async () => {
    const response = await request(app)
        .get('/expenses')
        .expect('Content-Type','text/plain; charset=utf-8')
        //should redirect
        .expect('Location','/login')
        expect(response.redirect).toBeTruthy()
        expect(response.text).toContain('Redirecting')
})



//log in user using credentials
it ('should redirect to /expenses on successful login', async ()=> {
    const response = await request(app)
        .post('/login')
        .send(user1)
        .expect('Content-Type','text/plain; charset=utf-8')
        //.expect('Location','/expenses')
        expect(response.redirect).toBeTruthy()


})

// REJECTS user with no credentials, redirects after a failed login 

it ('should redirect to login page again, when nonexistent user', async() =>{
    const response = await request(app)
        .post('/login')
        .send(user2)
        .expect('Content-Type','text/plain; charset=utf-8')
        .expect('Location','/login')
        expect(response.redirect).toBeTruthy()


})



// ~~~ testing expense instance functionality ~~~

// GETs list of expenses
it ('displays list of expenses', async () => {
    const response = await request(app)
        .get('/expenses')
        .set('Accept','application/json')
        expect(response.redirect).toBeTruthy()
})


it ('get the new expense page', async() => {
    const response = await request(app)
        .get('/expenses/new')

})


// create a new expense
it('Testing to create a new expense', async () => {
    const response = await request(app)
        .post('/expense/')
        .send(test1)
        .set('Accept', 'application/json')


});

// delete an existing expense
it( 'Testing to delete an expense', async () => {
    const response = await request(app)
        .post('/expense/delete/0')
        .set('Accept','application/json')

});

//delete a nonexistent expense
it ('Testing to delete an expense that doesn\'t exist', async ()=>{
    const response = await request(app)
        .post('/expense/delete/99999')
        .set('Accept','application/json')


})

