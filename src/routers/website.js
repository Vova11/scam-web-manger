const express = require('express')
const router = new express.Router()
const Website = require('../models/website')
const auth = require('../middleware/auth')
const User = require('../models/user')
const fixUrl = require('../middleware/fixUrl')
const { db } = require('../models/website')

router.post('/websites', [fixUrl, auth], async (req, res) => {
  const website = new Website({
    ...req.body,
    owner: req.user._id
  })
  try {
    await website.save()  
    res.status(201).send(website)
  } catch (error) {
    res.status(400).send(error)  
  }
})

// GET websites?active=true
// GET websites?limit=10&skip=0
// GET websites?sortBy=createdAt_asc or GET websites?sortBy=createdAt:dsc
//{{url}}/websites?created_at:asc
// GET websites
router.get('/websites', auth, async (req, res) => {
  const match = {}
  const sort = {}
  
  if (req.query.active) {
    match.active =  req.query.active === 'true' 
  }

  if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':')
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    await req.user.populate({
      path: 'websites',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
        
    })
    res.send(req.user.websites)
  } catch (error) {
    res.status(500).send()
  }
})


router.get('/scams', async (req, res) => {
  let {limit, skip } = req.query
  if (!limit) {
    limit = 10
  }
  if (!skip) {
    skip = 1
  }
  let prevPage = 1
  if (skip > 1 ) {
    prevPage = skip -1
  } 

  try {
    const scams = await Website.find({}).sort('createdAt').limit(limit).skip(skip)
    let total =  await Website.countDocuments({})
    console.log(total);
    res.send({
      limit,
      current_page: skip,
      prevPage,
      lastPage: Math.ceil(total / limit),
      data: scams
    })
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/search', async (req, res) => {
  const title = req.query.title
  console.log(title);
  try {
    const website = await Website.find({title})
    if (!website) {
      return res.status(404).send()
    }
    res.status(200).send(website)
  } catch (error) {
    res.status(500).send()
  }
})


router.get('/websites/:id', auth, async (req,res) => {
  const _id = req.params.id
  try {
    const website = await Website.findOne({ _id, owner: req.user._id  })
    if (!website) {
      return res.status(404).send()
    }
    res.send(website)
  } catch (error) {
    res.status(500).send()    
  }
})

router.patch('/websites/:id', auth, async (req,res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'description','link']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({error})
  }
  try {
    const website = await Website.findOne({_id: req.params.id, owner: req.user._id})
    
    if (!website) {
      return res.status(404).send()  
    }
    updates.forEach((update) => {
      website[update] = req.body[update]
    })
    await website.save()
    res.send(website)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/websites/:id', auth, async (req,res) => {
  try {
    const website = await Website.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    if (!website) {
      return res.status(404).send() 
    }
    res.send(website)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router