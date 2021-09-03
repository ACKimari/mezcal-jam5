const router = require('express').Router();
const { Quote } = require('../../Models');


router.get('/', (req, res) => {
  console.log(Quote)
  Quote.findAll()
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
  Quote.findByPk(req.params.id)
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
  Quote.create({
    author: req.body.author,
    category: req.body.category,
    quote: req.body.quote,
    user_id: req.body.user_id

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