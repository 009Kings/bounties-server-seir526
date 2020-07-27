const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const db = require('../../models');

// GET v1/auth/register (Public)
router.post('/register', (req, res) => {
  // Find User By Email
  db.User.findOne({ email: req.body.email })
    .then(user => {
      // If email already exists, send 400 response
      if(user) {
        return res.status(400).json({message: 'Email already exists'});
        // If email does not already exist, create new user
      } else {
        // Create new user
        const newUser = new db.User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        // Salt and Hash password with bcryptjs, then save new user
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
});

// GET v1/auth/login (Public)
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find User by email
  db.User.findOne({ email })
    .then(user => {
      // Check for user
      if(!user) {
        return res.status(404).json({ message: 'Invalid Login Credentials' })
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // User matched, send JSON Web Token

            // Create token payload (you can include anything you want)
            const payload = {...user}
            delete payload.password;
            delete payload.email;

            // Sign token
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
              res.json({ success: true, token: 'Bearer ' + token })
            });
          } else {
            return res.status(400).json({ message: 'Invalid Login Credentials' })
          }
        })
    })
});

// GET v1/auth/current (Private)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  let userToReturn = {...req.user._doc}
  delete userToReturn.password
  res.json(userToReturn)
});

module.exports = router;