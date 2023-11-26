const router = require('express').Router();
const { verifyAuth } = require('../../middlewares/verifyAuth');

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to Express and sequelize project Version 1' });
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/signout', verifyAuth, require('./signout'));
router.use('/refresh-token', require('./refreshToken'));

module.exports = router;
