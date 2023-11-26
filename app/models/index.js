const { sequelize, Sequelize } = require('../config/database');

const { DataTypes } = Sequelize;

const User = require('./user')(sequelize, DataTypes);
const RefreshToken = require('./refreshtoken')(sequelize, DataTypes);
const Role = require('./role')(sequelize, DataTypes);
const UserRole = require('./userrole')(sequelize, DataTypes);

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

module.exports = {
  User,
  RefreshToken,
  Role,
  UserRole,
};
