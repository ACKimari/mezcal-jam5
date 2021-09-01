const router = require('express').Router();
// const db = require('../../models');

router.get('/', (req, res) => {
  db.Teacher.findAll()
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
  db.Teacher.findByPk(req.params.id)
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
  db.Teacher.create({
    name: req.body.name,
    location: req.body.location,
    bio_short: req.body.bio_short,
    bio_full: req.body.bio_full,
    image_name: "default.jpeg"

  })
    .then(newTeacher => {
      res.json(newTeacher);
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