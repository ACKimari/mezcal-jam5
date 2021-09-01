const router = require('express').Router();
// const db = require('../../models');
const passport = require('passport');

router.get('/', (req, res) => {
  db.User.findAll({include:[db.Quote]})
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


router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/directory',

  failureRedirect: '/login'
}
));

router.post("/request/:id", (req,res) =>{
  if(!req.user){
    res.status(401).json({
      message:"Please login to get your daily calm!"
    })
  } else {
    db.Quote.findByPk(req.params.id).then(userData=>{
      userData.addUser(req.user.id).then(done=>{
        res.json({message:"request sent"})
      })
    })
  }
})

router.post("/", (req, res) => {
  db.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "error",
        error: err
      })
    })
})

router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with that ID' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;