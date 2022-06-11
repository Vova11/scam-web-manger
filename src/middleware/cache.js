const {client} = require('../../utils/redis')

async function cache(req, res, next) {
  try {
    const data = await client.get("data")
    if (data !== null) {
      console.log('Data from Redis...');
      return res.send(JSON.parse(data))
    } else {
      console.log('Data from DB...');
    }
  } catch (error) {
    throw error
  }
  next()
}

module.exports = cache