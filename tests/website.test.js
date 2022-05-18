const request = require('supertest')
const app = require('../api/app')
const Website = require('../api/models/website')
const User = require('../api/models/user')
const { 
  userOneId, 
  userOne, 
  userTwoId,
  userTwo,
  websiteOne,
  websiteTwo,
  websiteThree, 
  setUpDatabase
} = require('./fixtures/db')
const fixUrl = require('../api/middleware/fixUrl')
const { send } = require('express/lib/response')

jest.setTimeout(90000);
beforeEach(setUpDatabase);

test('Should create task for user',  async() => {
  // console.log(userOne);
  const response = await request(app)
      .post('/websites')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        title: 'scampage.sk/home?find=services'
      })
      .expect(201)
  const website = Website.findById(response.body._id)
  expect(website).not.toBeNull()
  // expect(website.title).toEqual('scampage')
})

test('get websites that belongs to user', async () => {
  const response = await request(app)
      .get('/websites')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200)
      expect(response.body.length).toEqual(2)
    
})

test('test should not delete other user websites', async() => {
  const response = await request(app)
    .delete(`/websites/${websiteOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const website = Website.findById(websiteOne._id)
    expect(website).not.toBeNull()



})