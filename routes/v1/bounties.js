// import stuff
const express = require('express')
const router = express.Router()
const db = require('../../models')

// write sum routes
// Index
router.get('/', (req, res) => {
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
  // TODO: Figure out splitting and trimming for variable whitespace
  req.body.hunters = req.body.hunters.split(',')

  db.Bounty.create(req.body)
    .then(newBounty => {
      res.send(newBounty)
    })
    .catch(err => console.error(err))
})

// Update
router.put('/:id', (req, res) => {
  res.send('UPDATE')
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