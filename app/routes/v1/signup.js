const router = require('express').Router();
const controls = require('../../controllers/v1/signup');

// Swagger schema for post method of '/api-v1/signup'.
/**
 * @swagger
 * components:
 *   schemas:
 *     signup:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *
 *       example:
 *         name: John Doe
 *         email: johndoe@mailinator.com
 *         password: password
 */

/**
 * @swagger
 * /api-v1/signup:
 *   post:
 *     summary: "Register new user"
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signup'
 *     responses:
 *       201:
 *         description: The response of user created.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User created successfully!
 *               user:
 *                 id: adfa4f65fd-fa45d4f54d-adf54df5
 *                 name: John Doe
 *                 email: johndoe@mailinator.com
 *                 password: password
 *       500:
 *         description: Error message.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error message
*/

// Post method of '/api-v1/signup' route
router.post('/', controls.signupController);

module.exports = router;
