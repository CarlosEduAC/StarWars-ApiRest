module.exports = {
  "type": "mongodb",
  "url": process.env.NODE_ENV === 'test' ?
    process.env.MONGO_URL_TEST :
    process.env.MONGO_URL,
  "useUnifiedTopology": true,
  "useNewUrlParser": true,
  "synchronize": true,
  "logging": true,
  "ssl": true,
  "entities": [
    process.env.NODE_ENV === 'production' ?
    process.env.ENTITIES_PRODUCTION :
    process.env.ENTITIES_DEVELOPMENT,
  ]
}
