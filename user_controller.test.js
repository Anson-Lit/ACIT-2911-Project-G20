const controller = require('./controller/user_controller')

const user1 = {
    id : 1,
    email: 'John@gmail.com',
    password: 'j'
}
const user2 = {
    id : 2,
    email: 'test@email.com',
    password:'123'
}

it('should return user when given valid credentials', () => {
    let test_user = controller.getUserByEmailIdAndPassword(user1.email,user1.password)
    expect(test_user.email).toBe(user1.email)
    expect(test_user.password).toBe(user1.password)
})

it('should throw an error when given invalid credentials', () =>{
    expect( ()=> {
        let test_user = controller.getUserByEmailIdAndPassword(user2.email,user2.password)
        expect(test_user).toBe(null)
    }).toThrowError()
})

it('should return user when given valid id', () => {
    let test_user = controller.getUserById(user1.id)
    expect(test_user.email).toBe(user1.email)
})

it('should throw an error when given invalid id', ()=>{
    expect( ()=> {
        let test_user = controller.getUserById(user2.id)
        expect(test_user).toBe(null)
    }).toThrowError()
})