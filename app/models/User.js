const { Model } = require('sequelize');
const { hashSync } = require('bcrypt');
const moment = require('moment-timezone');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          let fullname = '';
          if (this.firstName) {
            fullname += `${this.firstName} `;
          }
          if (this.lastName) {
            fullname += `${this.lastName}`;
          }
          return fullname;
        },
        set(value) {
          throw new Error('Do not try to set the `fullName` value!');
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdTime: DataTypes.DATE,
      updatedTime: DataTypes.DATE,
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          const hashedPassword = hashSync(instance.password, 10);
          instance.password = hashedPassword;
          const now = moment(new Date()).tz('Asia/Kolkata');
          instance.createdTime = now;
          instance.updatedTime = now;
        },
        beforeUpdate: (user, options) => {
          instance.updatedTime = moment(new Date()).tz('Asia/Kolkata');
        },
      },
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
