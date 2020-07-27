require('dotenv').config()
const cors = require('cors')
const express = require('express')
const passport = require('passport')

const app = express()

// Middleware goes here
app.use(cors({
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Nothing to see here, move along human'})
})

// Passport Middleware
app.use(passport.initialize());

// Passport JWT Config
require('./config/passport')(passport);

// Use Routes
// TODO—write sum routes, put them in
app.use('/v1/auth', require('./routes/v1/auth'));
app.use('/v1/bounties', require('./routes/v1/bounties'))
app.use('/v1', passport.authenticate('jwt', { session: false }), require('./routes/v1/userSaves'))

// LISTEN
app.listen(process.env.PORT || 3000, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${process.env.PORT || 3000} 🎧`)
})