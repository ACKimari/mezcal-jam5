const router = require('express').Router();
const userRoutes = require('../userRoutes');
const teacherRoutes = require('../teacherRoutes');


router.use('/users', userRoutes);
router.use('/teachers', teacherRoutes);


module.exports = router;