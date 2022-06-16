const express = require('express')
const router = new express.Router()
const Customer = require('../models/customer')

router.post('/savecustomer', async (req, res) => {
  console.log(req.body);
  const customer = new Customer(req.body)
  try {
    await customer.save()
    res.status(201).send(customer)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router