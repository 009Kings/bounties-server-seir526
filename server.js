require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./models')
const cors = require('cors')

// Middleware goes here
app.use(cors({
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
  res.send('Nothing to see here, move along human')
})

app.use('/v1/bounties', require('./routes/v1/bounties'))

// TODO: Delete test route
// app.get('/test', (req, res) => {
//   db.Bounty.find()
//     .then(bounties => res.send(bounties))
//     .catch(err => {
//       console.error(err)
//       res.send({ message: 'Server Error' })
//     })
// })

// LISTEN
app.listen(process.env.PORT || 3000, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${process.env.PORT || 3000} 🎧`)
})