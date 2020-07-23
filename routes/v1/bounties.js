// import stuff
const express = require('express')
const router = express.Router()
const db = require('../../models')

// write sum routes
// Index
router.get('/', (req, res) => {
  console.log("✨ get dat bounty")
  db.Bounty.find()
    .then(bounties => {
      res.send(bounties)
    })
    .catch(err => console.error(err))
})

// Show
router.get('/:id', (req, res) => {
  db.Bounty.findById(req.params.id)
    .then(bounty => {
      res.send(bounty)
    })
    .catch(err => console.error(err))
})

// Create
router.post('/', (req, res) => {
  // splitting and trimming for variable whitespace
  console.log(req.body)
  req.body.hunters = req.body.hunters.split(',').map(hunter=>hunter.trim())
  for (key in req.body) {
    if (!req.body[key] || (key === "hunters" && !req.body[key][0])) {
      delete req.body[key]
    }
  }

  db.Bounty.create(req.body)
    .then(newBounty => {
      res.send(newBounty)
    })
    .catch(err => console.error(err))
})

// Update
router.put('/:id', (req, res) => {
  db.Bounty.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  )
  .then(updatedBounty => {
    res.send(updatedBounty)
  })
  .catch(err => console.error(err))
})

// Delete
router.delete('/:id', (req, res) => {
  db.Bounty.findOneAndDelete({ _id: req.params.id })
    .then(deletedItem => {
      console.log(deletedItem)
      res.send({ message: 'Successful Deletion'})
    })
    .catch(err => console.error(err))
})

// export dem routes
module.exports = router