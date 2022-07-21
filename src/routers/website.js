const express = require('express')
const router = new express.Router()
const Website = require('../models/website')
const auth = require('../middleware/auth')
const cache = require('../middleware/cache')
const fixUrl = require('../middleware/fixUrl')
const {client} = require('../../utils/redis')


DEFAULT_EXPIRATION = 604800


router.post('/websites', [auth, fixUrl], async (req, res) => {
  const website = new Website({
    ...req.body,
    owner: req.user._id
  })
  const check = await client.exists(`data_${req.body.title}`);
  if (check == 1) {
    return res.status(400).send({msg: "Scam page is already saved in Redis"})
  }
  
  try {
    await website.save()
    await client.setEx(`data_${req.body.title.toLowerCase()}`, DEFAULT_EXPIRATION, JSON.stringify({website}))
    res.status(201).send(website)
  } catch (error) {
    res.status(400).send(error)  
  }
})

// GET wesbsites?active=true
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
  
  try {
    const scams = await Website.find().sort({createdAt:  -1});
    // SET TO REDIS
    const redisValues = JSON.stringify({
      data: scams
    });
    client.setEx('data', DEFAULT_EXPIRATION, redisValues, function(err, reply) {
        console.log(reply);
    })

    res.send({
      data: scams
    })
  } catch (error) {
    res.status(500).send()
  }
})


// router.get('/scams', cache, async (req, res) => {
//   let {limit, skip } = req.query
//   if (!limit) {
//     limit = 10
//   }
//   if (!skip) {
//     skip = 1
//   }
//   let prevPage = 1
//   if (skip > 1 ) {
//     prevPage = skip -1
//   } 

//   try {
//     const scams = await Website.find().sort('createdAt').limit(limit).skip(skip);
//     let total =  await Website.countDocuments({})
//     // SET TO REDIS
//     const redisValues = JSON.stringify({
//       data: scams
//     });
//     client.setEx('data', DEFAULT_EXPIRATION, redisValues, function(err, reply) {
//         console.log(reply);
//     })

//     res.send({
//       limit,
//       current_page: skip,
//       prevPage,
//       lastPage: Math.ceil(total / limit),
//       data: scams
//     })
//   } catch (error) {
//     res.status(500).send()
//   }
// })


router.get("/search", async (req, res) => {
  const title = req.query.title
  try {
    // Get from cache using the "Key"
    const getRes = await client.get(`data_${title}`);
    
    const check = await client.exists(`data_${title}`); // check if token exists in cache already
    if (check == 1) console.error("Scam page is saved in Redis");
    if (getRes)
      return res.json({ success: true, data: JSON.parse(getRes) });
    // On cache-miss => query database
    const website = await Website.find({title})
    if (!website) {
      return res.status(404).send()
    }
    // Set cache
    await client.setEx(`data_${title}`, DEFAULT_EXPIRATION, JSON.stringify({website}))
    return res.status(200).json({success: true, data: website});
  } catch (error) {
    res.status(500).send()
  }
});


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
    console.log(website.title);
    const data = await client.get(`data_${website.title}`)
    if (data ) {
      console.log('found and deleting');
      await client.del(`data_${website.title}`)
    }

    await client.setEx(`data_${req.body.title.toLowerCase()}`, DEFAULT_EXPIRATION, JSON.stringify({website}))

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


