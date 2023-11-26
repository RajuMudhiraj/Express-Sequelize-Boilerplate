/* eslint-disable max-len */
const router = require('express').Router();
const controls = require('../../controllers/v1/signout');

/**
 * @swagger
 * /api-v1/signout:
 *   post:
 *     summary: "Signout and delete refresh token from database"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The response of user created.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Signed out successfully!
 *       500:
 *         description: Error message.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error message
 */

// Post method of '/api-v1/signout' route
router.post('/', controls.signoutController);

module.exports = router;
