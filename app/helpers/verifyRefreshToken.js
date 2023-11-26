/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-promise-executor-return */
const jwt = require('jsonwebtoken');
const models = require('../models/index');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

exports.verifyRefreshToken = (refreshToken) => new Promise(async (resolve, reject) => {
  try {
    const isExists = await models.RefreshToken.findOne({
      where: { refreshToken },
    });
    if (!isExists) {
      return reject({ success: false, message: 'Invalid refresh token' });
    }

    jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET_KEY,
      (err, tokenDetails) => {
        if (err) {
          return reject({ success: false, message: 'Invalid refresh token' });
        }

        return resolve({
          success: true,
          message: 'Valid refresh token',
          tokenDetails,
        });
      },
    );
  } catch (error) {
    return reject({ success: false, message: error.message });
  }
});
