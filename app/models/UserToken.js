const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class UserToken extends Model { }

UserToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    sequelize,
    modelName: 'User_token',
  },
);

module.exports = { UserToken };
