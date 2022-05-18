const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Website = require('../../src/models/website')

const userOneId = new mongoose.Types.ObjectId()
const userTwoId = new mongoose.Types.ObjectId()

const userOne = {
  _id: userOneId,
  name: "John Doe",
  email: "john@gmail.com",
  password: "Red123!",
  tokens: [{
    token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
  }]
}

const userTwo = {
  _id: userTwoId,
  name: "Mike",
  email: "mike@example.com",
  password: "Blue123!",
  tokens: [{
    token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
  }]
}

const websiteOne = {
  _id: new mongoose.Types.ObjectId(),
  title: "suprisimo.sk",
  description: "about the scam page",
  link: "www.suprisimo.sk",
  active: true,
  owner: userOne._id
}

const websiteTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: "bbc.co.uk",
  description: "second task",
  link: "www.suprisimo.sk",
  active: true,
  owner: userOne._id
}

const websiteThree = {
  _id: new mongoose.Types.ObjectId(),
  title: "facebook.com",
  description: "third website",
  link: "www.suprisimo.sk",
  active: false,
  owner: userTwo._id
}


const setUpDatabase = async () => {
  mongoose.connect(process.env.MONGO_URI);
  const db = await mongoose.connection;
  await db.on('error', (err) => {
    throw new Error('Connection failed')
  });
  await db.once('open', () => {
    console.log('Connected to DB ...');
  });
  await User.deleteMany()
  await Website.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Website(websiteOne).save()
  await new Website(websiteTwo).save()
  await new Website(websiteThree).save()
}

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  websiteOne,
  websiteTwo,
  websiteThree,
  setUpDatabase
}