const { compare } = require('bcrypt');
const models = require('../../models/index');
const { generateTokens } = require('../../helpers/generateTokens');

exports.signinController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Checking the existence of email.
    let emailExistence = await models.User.findOne({
      where: { email },
      attributes: ['id', 'email', 'firstName', 'lastName', 'fullName', 'password'],
      include: [
        {
          model: models.Role,
          attributes: ['role'],
          through: { attributes: [] },
        },
      ],
    });
    emailExistence = emailExistence?.toJSON();
    emailExistence?.Roles.map(
      (obj, index) => (emailExistence.Roles[index] = obj.role)
    );
    console.log(emailExistence);
    if (emailExistence) {
      const isPasswordCorrect = await compare(
        password,
        emailExistence.password
      );
      if (isPasswordCorrect) {
        const { accessToken, refreshToken } = await generateTokens(
          emailExistence
        );

        return res.status(200).json({
          success: true,
          name: emailExistence.name,
          message: 'You have signed in successfully!',
          accessToken: `Bearer ${accessToken}`,
          refreshToken,
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Wrong credentials',
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Wrong credentials',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
