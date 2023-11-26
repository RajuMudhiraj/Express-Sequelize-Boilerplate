const { hashSync } = require('bcrypt');
const { Op } = require('sequelize');
const models = require('../../models/index');

exports.signupController = async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  try {
    const userExistence = await models.User.findOne({ where: { email } });
    if (!userExistence) {
      const user = await models.User.create({
        firstName,
        lastName,
        email,
        password,
      });

      // Creating User Role (if not exist) and assigning to newly signedup user
      let userRole = await models.Role.findOne({ where: { role: 'User' } });

      if (!userRole) {
        userRole = await models.Role.create({ role: 'User' });
      }

      await user.setRoles([userRole]);

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
