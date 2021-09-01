const router = require('express').Router();
const userRoutes = require('../userRoutes');
const quoteRoutes = require('../quoteRoutes');
const followerRoutes = equire('../followerRoutes');


router.use('/users', userRoutes);
router.use('/quotes', quoteRoutes);
router.use('/followers', followerRoutes);


module.exports = router;