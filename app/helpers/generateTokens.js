const jwt = require('jsonwebtoken');
const models = require('../models/index');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

exports.generateTokens = async (user) => {
  try {
    const payload = { id: user.id, roles: user.Roles };

    const accessToken = jwt.sign(payload, config.JWT_SECRET_KEY, {
      expiresIn: '14m',
    });

    const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: '30d',
    });

    const userToken = await models.RefreshToken.findOne({
      where: { userId: user.id },
    });
    if (userToken) {
      await userToken.update({ refreshToken });
    } else {
      await models.RefreshToken.create({ userId: user.id, refreshToken });
    }

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
};
