const router = require('express').Router();
const { passport } = require('../../config/passport.config');
const { roleVerify } = require('../../middlewares/roleVerify');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Express and sequelize project Version 1' });
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/refresh-token', require('./refreshToken'));
router.use('/signout', require('./signout'));

// public route
router.get('/public-route', async (req, res) => res.status(200).json({ success: true, message: 'You have accessed the public route' }));

// protected route
router.get('/protected-route', passport.authenticate('jwt', { session: false }), async (req, res) => res.status(200).json({ success: true, message: 'You have accessed the protected route' }));

// Users with admin role can only accessible route
router.get('/admin-route', passport.authenticate('jwt', { session: false }), roleVerify('admin'), async (req, res) => res.status(200).json({ success: true, message: 'You have accessed the admin role can only accessible route' }));

module.exports = router;
