const jwt = require('jsonwebtoken');
const { verifyRefreshToken } = require('../../helpers/verifyRefreshToken');
const models = require('../../models/index');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

exports.refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const { tokenDetails } = await verifyRefreshToken(refreshToken);
    const { id, roles } = tokenDetails;

    const payload = { id, roles };

    const accessToken = jwt.sign(payload, config.JWT_SECRET_KEY, {
      expiresIn: '14m',
    });

    return res.status(200).json({
      success: true,
      message: 'New access token created successfully!',
      accessToken: `Bearer ${accessToken}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};
