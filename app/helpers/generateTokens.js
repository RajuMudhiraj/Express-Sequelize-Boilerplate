const jwt = require('jsonwebtoken');
const { UserToken } = require('../models/UserToken');

exports.generateTokens = async (user) => {
  try {
    const payload = { id: user.id, roles: user.roles };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: '14m' },
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: '30d' },
    );

    const userToken = await UserToken.findOne({ where: { userId: user.id } });
    if (userToken) {
      await userToken.destroy();
    }

    await UserToken.create({ userId: user.id, token: refreshToken });

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
};
