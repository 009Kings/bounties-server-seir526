// import mongoose
const mongoose = require('mongoose')

// set up the mongoose connection
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/hunters',
  { useNewUrlParser: true,    
    useFindAndModify: false,
    useUnifiedTopology: true  }
)
let db = mongoose.connection

// set up console logs
db.once('open', () => {
  console.log(`🔗 Connected to MongoDB at ${db.host}:${db.port}`)
})
db.on('error', err => {
  console.log(`💩 Database error:`)
  console.error(err)
})

// export all our models
module.exports.Bounty = require('./bounty')
module.exports.User = require('./user')