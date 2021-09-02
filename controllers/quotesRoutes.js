const router = require('express').Router();
const db = require('../Models');

router.get('/', (req, res) => {
  db.Quote.findAll()
    .then(userData => {
      res.json(userData)
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Uh oh!",
        error: err
      })
    })
})

router.get('/:id', (req, res) => {
  db.Quote.findByPk(req.params.id)
    .then(userData => {
      res.json(userData)
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Uh oh!",
        error: err
      })
    })
})

router.post("/", (req, res) => {
  db.Quote.create({
    name: req.body.name,
    tag_short: req.body.bio_short,
    image_name: "default.jpeg"

  })
    .then(newQuote => {
      res.json(newQuote);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "error",
        error: err
      })
    })
})

module.exports = router;