const router = require('express').Router();
const controls = require('../../controllers/v1/signout');
const { passport } = require('../../config/passport.config');






// Swagger schema for post method of '/api-v1/signout'.
/**
 * @swagger
 * components:
 *   schemas:
 *     signout:
 *       type: object
 *       required:
 *         - refresh_token
 *       properties:
 *         refresh_token:
 *           type: string
 * 
 *       example:
 *         refresh_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1ZmY4NDRhLWU0YTQtNDRjNi1hY2M3LWE4MmIwYWNkNTcyMiIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNjU0MTU2MjQyLCJleHAiOjE2NTY3NDgyNDJ9.OAkoaSgBKh1XcQ5ZcEItiCEtBNzvNWLQqnRDrOoYNNY
 */


/**
 * @swagger
 * /api-v1/signout:
 *   post:
 *     summary: "Signout and delete refresh token from database"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signout'
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
router.post('/', passport.authenticate('jwt', { session: false }), controls.signout_controller)

module.exports = router;