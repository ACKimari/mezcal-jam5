const router = require('express').Router();
const userRoutes = require('./userRoutes');
const quotesRoutes = require('./quotesRoutes');
const followerRoutes = require('./followerRoutes');


router.use('/users', userRoutes);
router.use('/quotes', quotesRoutes);
router.use('/followers', followerRoutes);


module.exports = router;