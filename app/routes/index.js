const router = require('express').Router();

// Home route
router.get('/', (req, res) => res.status(200).send(`<div style="text-align:center";> <br />
<h2>Welcome to Express Sequelize Boilerplate</h2>
<h3><a href='/api-docs'> Goto API documentation</a></h3>
</div>`));

// All Version1 routes
router.use('/api-v1', require('./v1/index'));

module.exports = router;
