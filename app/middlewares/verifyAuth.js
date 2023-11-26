/* eslint-disable consistent-return */
// eslint-disable-next-line consistent-return
const jwt = require('jsonwebtoken');

const env = process.env.NODE_ENV;
const config = require('../config/config')[env];

const verifyAuth = async (req, res, next) => {
  try {
    console.log('testing authentication ---------');
    const token = req.headers.authorization.split(' ')[1];
    // console.log(1, token);
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    if (decoded) {
      req.user = decoded;
      // console.log(req.user, "checking")
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: 'Authentication failed.',
    });
  }
};

module.exports = { verifyAuth };
