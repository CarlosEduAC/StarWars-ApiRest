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
  "entities": ["dist/models/**/*.js"]
}
