const router = require('express').Router();
const controls = require('../../controllers/v1/signup');
const upload = require('../../helpers/multer');

/**
 * @swagger
 * /api-v1/signup:
 *   post:
 *     summary: "Register new user"
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
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
router.post('/', upload.none(), controls.signupController);

module.exports = router;
