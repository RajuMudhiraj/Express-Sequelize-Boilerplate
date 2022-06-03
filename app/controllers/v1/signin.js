const { compare } = require('bcrypt');
const { User } = require('../../models/User');
const { loginBodyValidation } = require('../../helpers/validationSchema');
const { generateTokens } = require('../../helpers/generateTokens');

exports.signinController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = loginBodyValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details,
      });
    }

    // Checking the existence of email.
    const emailExistence = await User.findOne({ where: { email } });

    if (emailExistence) {
      const isPasswordCorrect = await compare(password, emailExistence.password);
      if (isPasswordCorrect) {
        const { accessToken, refreshToken } = await generateTokens(emailExistence);

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
