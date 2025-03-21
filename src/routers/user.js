const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/', (req, res) => {
  res.status(200).send('v2')
})

router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    console.log(token);
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/users', auth, async (req,res) => {
  try {
    const users = await User.find({})  
    res.send(users)
  } catch (error) {
    res.status(500).send()
    console.log('Test');
  }
})

router.get('/users/profile', auth, async (req,res) => {
  res.send(req.user)
})

// router.get('/users/:id', auth, async (req,res) => {
//   const _id = req.params.id
//   try {
//     const user = await User.findById(_id)  
//     if (!user) {
//       return res.status(404).send()
//     }
//     res.send(user)
//   } catch (error) {
//     res.status(500).send()    
//   }
// })

// router.patch('/users/:id', auth, async (req,res) => {
//   const updates = Object.keys(req.body)
//   const allowedUpdates = ['name', 'email','pasword', 'admin']
//   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//   if (!isValidOperation) {
//     return res.status(400).send({error})
//   }
//   try {
//     const user = await User.findById(req.params.id)
//     updates.forEach((update) => {
//       user[update] = req.body[update]
//     })
    
//     await user.save()
//     if (!user) {
//       return res.status(404).send()  
//     }
//     res.send(user)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

// router.delete('/users/:id', auth, async (req,res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id)
//     if (!user) {
//       return res.status(404).send() 
//     }
//     res.send(user)
//   } catch (error) {
//     res.status(500).send()
//   }
// })

router.patch('/users/me', auth, async (req,res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email','pasword', 'admin']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  
  if (!isValidOperation) {
    return res.status(400).send({error})
  }
  
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update]
    })
    await req.user.save()
    res.send(req.user)
  } catch (error) {
    res.status(400).send()
  }
})

router.delete('/users/me', auth, async (req,res) => {
  try {
    await req.user.remove()
    res.status(200).send(req.user)
  } catch (error) {
    res.status(401).send()
  }
})

router.post('/users/login', async (req,res) => {
  try {
    const user = await User.findByCredentials(req.body.email,req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send()
  }
})

router.post('/users/logout', auth, async (req,res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
  })
    await req.user.save()
    res.send()    
  } catch (error) {
    res.status(500).send()
  }
})


router.post('/users/logoutall', auth, async (req,res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()    
  } catch (error) {
    res.status(500).send()
  }
})



module.exports = router