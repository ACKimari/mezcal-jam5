const router = require('express').Router();
const { UserFollower, User } = require('../../Models');



router.get('/', (req, res) => {
  console.log("getting following data");
  UserFollower.findAll({include:[User]})
    .then(followerData => {
      console.log(followerData);
      res.json(followerData)
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Uh oh!",
        error: err
      })
    })
})

router.get('/:id', (req, res) => {
  User.findByPk(req.params.id)
    .then(followerData => {
      res.json(followerData)
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Uh oh!",
        error: err
      })
    })
})


router.post("/request/:id", (req,res) =>{
  if(!req.follower){
    res.status(401).json({
      message:"Please login to get your daily calm!"
    })
  } else {
    User.findByPk(req.params.id).then(followerData=>{
      followerData.addFollower(req.follower.id).then(done=>{
        res.json({message:"request sent"})
      })
    })
  }
})

router.post("/", (req, res) => {
  UserFollower.create({
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
    const followerData = await Follower.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!followerData) {
      res.status(404).json({ message: 'No user found with that ID' });
      return;
    }

    res.status(200).json(followerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;