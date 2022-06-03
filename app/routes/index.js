const router = require('express').Router();

// Home route
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Express and sequelize project' });
});

// All Version 1 routes
router.use('/api-v1', require('./v1/index'));

module.exports = router;
