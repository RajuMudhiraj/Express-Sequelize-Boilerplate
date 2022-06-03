/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-promise-executor-return */
const jwt = require('jsonwebtoken');
const { UserToken } = require('../models/UserToken');

exports.verifyRefreshToken = (refreshToken) => {
  const secretKey = process.env.REFRESH_TOKEN_SECRET_KEY;

  return new Promise(async (resolve, reject) => {
    try {
      const doc = await UserToken.findOne({ where: { token: refreshToken } });
      if (!doc) {
        return reject({ success: false, message: 'Invalid refresh token' });
      }

      jwt.verify(refreshToken, secretKey, (err, tokenDetails) => {
        if (err) {
          return reject({ success: false, message: 'Invalid refresh token' });
        }

        return resolve({
          success: true,
          message: 'Valid refresh token',
          tokenDetails,
          createdAt: doc.createdAt,

        });
      });
    } catch (error) {
      return reject({ success: false, message: error.message });
    }
  });
};
