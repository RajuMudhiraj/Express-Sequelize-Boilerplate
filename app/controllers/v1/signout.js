const models = require('../../models/index');

exports.signoutController = async (req, res) => {
  const { id } = req.user;

  try {
    const isExists = await models.RefreshToken.findOne({
      where: { userId: id },
    });

    if (!isExists) {
      return res.status(200).json({
        success: true,
        message: 'Signed out successfully!',
      });
    }

    await isExists.destroy();
    return res.status(200).json({
      success: true,
      message: 'Signed out successfully!',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
