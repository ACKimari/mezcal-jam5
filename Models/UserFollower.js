const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserFollower extends Model { }

UserFollower.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
            defaultValue: DataTypes.NULL
        },
        Followers: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
            defaultValue: DataTypes.NULL
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'followers',
    }
);

module.exports = UserFollower;