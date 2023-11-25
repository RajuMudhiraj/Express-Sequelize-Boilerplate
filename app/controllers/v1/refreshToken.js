const jwt = require('jsonwebtoken');
const { verifyRefreshToken } = require('../../helpers/verifyRefreshToken');
const { UserToken } = require('../../models/UserToken');

exports.refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const { tokenDetails, createdAt } = await verifyRefreshToken(refreshToken);
    const { id, roles } = tokenDetails;

    const payload = { id, roles };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '14m',
    });

    const newRefreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: createdAt.getTime() + 1000 * 60 * 60 * 24 * 30 }
    );

    await UserToken.update(
      { token: newRefreshToken },
      { where: { userId: id } }
    );

    return res.status(200).json({
      success: true,
      message: 'Access token and refresh tokens are created successfully!',
      accessToken: `Bearer ${accessToken}`,
      newRefreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
