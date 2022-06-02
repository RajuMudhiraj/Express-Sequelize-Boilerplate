const router = require('express').Router()
const controls = require('../../controllers/v1/refresh_token')



// Swagger schema for post method of '/api-v1/refresh-token'.
/**
 * @swagger
 * components:
 *   schemas:
 *     refresh-token:
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
 * /api-v1/refresh-token:
 *   post:
 *     summary: "Re generate an access token"
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/refresh-token'
 *     responses:
 *       200:
 *         description: The response of access token created.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Access token created successfully!
 *               access_token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1ZmY4NDRhLWU0YTQtNDRjNi1hY2M3LWE4MmIwYWNkNTcyMiIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNjU0MTU2MjQyLCJleHAiOjE2NTY3NDgyNDJ9.OAkoaSgBKh1XcQ5ZcEItiCEtBNzvNWLQqnRDrOoYNNY
 *       500:
 *         description: Error message.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Error message
*/

// Post method of '/api-v1/refresh_token' route
router.post('/', controls.refresh_token_controller)

module.exports = router;