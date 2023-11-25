// eslint-disable-next-line consistent-return
exports.roleVerify = (role) => (req, res, next) => {
  try {
    if (req.user.roles.includes(role)) {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: 'You are not authorized' });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
