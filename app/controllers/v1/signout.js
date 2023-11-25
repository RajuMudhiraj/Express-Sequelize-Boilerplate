const { UserToken } = require('../../models/UserToken');

exports.signoutController = async (req, res) => {
  console.log('test', req.user);

  const { refreshToken } = req.body;
  const { id } = req.user;

  try {

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
