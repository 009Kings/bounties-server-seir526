const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/savedBounties', (req, res) => {
  console.log(`✨ Here are the bounties for ${req.user.name}`)
  db.User.findById(req.user.id).populate('watchedBounties')
  .then(user => {
    delete user.password
    res.status(200).json({user})
  })
})

module.exports = router;