const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Express and sequelize project Version 1' });
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/signout', require('./signout'));
router.use('/refresh-token', require('./refreshToken'));

module.exports = router;
