exports.roleVerify = (rolesArray) => (req, res, next) => {
  try {
    if (req.user.roles.includes(rolesArray)) {
      next();
    } else {
      return res.status(403).json({ success: false, message: 'You are not authorized' });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
