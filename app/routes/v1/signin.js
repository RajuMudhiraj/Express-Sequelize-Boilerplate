const router = require('express').Router();
const controls = require('../../controllers/v1/signin');

// Swagger schema for post method of '/api-v1/signup'.
/**
 * @swagger
 * components:
 *   schemas:
 *     signin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *
 *       example:
 *         email: johndoe@mailinator.com
 *         password: password
 */

/**
 * @swagger
 * /api-v1/signin:
 *   post:
 *     summary: "Signin and get JWT token"
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signin'
 *     responses:
 *       200:
 *         description: The response of user created.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: You have signed in successfully!
 *               name: John Doe
 *               accessToken: Bearer ad146e4r654a65df46d54f6ad4f6e45f645ad6f56d4ff6d46a4d6d45f
 *       500:
 *         description: Error message.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error message
*/

// Post method of '/api-v1/signin' route
router.post('/', controls.signinController);

module.exports = router;
