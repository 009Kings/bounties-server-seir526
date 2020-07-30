// import mongoose
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri,  {
  useUnifiedTopology: true  
});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



// set up the mongoose connection
mongoose.connect(uri, {
  useNewUrlParser: true,    
  useFindAndModify: false,
  useUnifiedTopology: true  
})
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