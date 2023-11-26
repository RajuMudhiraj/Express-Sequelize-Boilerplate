const router = require('express').Router();
const controls = require('../../controllers/v1/signin');
const upload = require('../../helpers/multer');

/**
 * @swagger
 * /api-v1/signin:
 *   post:
 *     summary: "Signin and get JWT token"
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
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
router.post('/', upload.none(), controls.signinController);

module.exports = router;
