
const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/database');

class User_token extends Model { };

User_token.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }

},
    {
        sequelize,
        modelName: 'User_token'
    }
);

module.exports = { User_token }




