const { Mongoose } = require('mongoose');
const redis = require('redis')
const REDIS_PORT = process.env.PORT || 6379
const client = redis.createClient({
  url: 'redis://127.0.0.1',
  port: REDIS_PORT
})

const connectRedis = async () => {
  console.log(`Connecting to Redis server on port: ${REDIS_PORT}... `);
  await client.connect();
  await client.on('connect', function() {
    console.log('Connected!');
  });
}

module.exports = {
  client,
  connectRedis
}
