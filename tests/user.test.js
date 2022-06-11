const request = require('supertest')
const app = require('../api/app')
const User = require('../api/models/user')
const { userOneId, userOne, setUpDatabase} = require('./fixtures/db')

jest.setTimeout(90000);

beforeEach(setUpDatabase);

test('Load root page', async () => {
  await request(app).get('/').expect(200)
})

test('Should signup a new user', async () => {
  const response = await request(app).post('/users').send({
    name: "Admin",
    email: "example@gmail.com",
    password: "Red123!"}).expect(201)

    // Assert that the databse was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertion about the response
    expect(response.body.user.name).toBe('Admin')
    expect(response.body).toMatchObject({
      user: {
        name:'Admin',
        email: "example@gmail.com",
      },
      token: user.tokens[0].token
    })
    expect(user.password).not.toBe("Red123!")
})

test('Should not sign up with invalid name/email/password', async () => {
  const response = await request(app).post('/users').send({
    name: "Admin",
    email: "example@gmail.com",
    password: "Red123!"}).expect(201)

    // Assert that the databse was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertion about the response
    expect(response.body.user.name).toBe('Admin')
    expect(response.body).toMatchObject({
      user: {
        name:'Admin',
        email: "example@gmail.com",
      },
      token: user.tokens[0].token
    })
    expect(user.password).not.toBe("Red123!")
    
})

test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password}).expect(200)
    // assertion about the response
    const user = await User.findById(userOne._id)
})

test('Should not login non existing user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: 'Pass12345!'}).expect(400)
})

test('Should get profile for user', async() => {
  await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenitaced user', async() => {
  await request(app)
        .patch('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for authenitaced user', async() => {
  await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('Should not delete account for unauthenitaced user', async() => {
  await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})


test('Should delete account for user', async() => {
  await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})


test('Should update valid user fields', async() => {
  await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
          name: 'Jess'
        })
        .expect(200)
        const user = await User.findById(userOneId)
        expect(user.name).toEqual('Jess')
      
})

// test('Should not update invalid user fields', async() => {
//   await request(app)
//         .patch('/users/me')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send({
//           location: 'New York'
//         })
//         .expect(400)
// })