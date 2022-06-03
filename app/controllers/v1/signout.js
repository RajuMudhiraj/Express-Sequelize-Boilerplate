const { UserToken } = require('../../models/UserToken');
const { refreshTokenBodyValidation } = require('../../helpers/validationSchema');

exports.signoutController = async (req, res) => {
  console.log('test', req.user);

  const { refreshToken } = req.body;
  const { id } = req.user;

  try {
    const { error } = refreshTokenBodyValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false, message: error.details,
      });
    }

    const userToken = await UserToken.findOne({
      where: { token: refreshToken, userId: id },
    });

    if (!userToken) {
      return res.status(200).json({
        success: true,
        message: 'Signed out successfully!',
      });
    }

    await userToken.destroy();
    return res.status(200).json({
      success: true,
      message: 'Signed out successfully!',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
