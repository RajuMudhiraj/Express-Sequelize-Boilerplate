const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to Express and sequelize project Version 1" })
})


router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));

// public route
router.get('/public-route', async (req, res) => {
    return res.status(200).json({ success: true, message: `You have accessed the public route` })
})

// protected route
router.get('/protected-route', async (req, res) => {
    return res.status(200).json({ success: true, message: `You have accessed the protected route` })
})


// Users with admin role can only accessible route
router.get('/admin-route', async (req, res) => {
    return res.status(200).json({ success: true, message: `You have accessed the admin role can only accessible route` })
})


module.exports = router;
