const { hashSync } = require('bcrypt');
const { User } = require('../../models/User');

exports.signupController = async (req, res) => {
  const { name, email, password } = req.body;
  try {

    const userExistence = await User.findOne({ where: { email } });
    if (!userExistence) {
      const user = await User.create({
        name,
        email,
        password: hashSync(password, 10),
      });
      return res.status(201).json({
        success: true,
        message: 'User created successfully!',
        user,
      });
    }

    return res.status(400).json({
      success: false,
      message: 'User with given email already exist',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
