const router = require('express').Router();

const userRoutes = require('./userRoutes');

router.use('/notes', userRoutes);

module.exports = router;
